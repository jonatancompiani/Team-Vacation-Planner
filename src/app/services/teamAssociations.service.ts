import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, combineLatest , forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { TeamService } from './team.service';
import { TeamMemberService } from './teamMember.service';

export interface TeamAssociation {
  id?: string;
  userId?: string;
  teamId?: string;
  teamName?: string; // Enriched data
  userName?: string; // Enriched data
}

@Injectable({
  providedIn: 'root',
})
export class TeamAssociationService {
  private collectionName = 'TeamAssociations';

  constructor(
    private afs: AngularFirestore,
    private teamService: TeamService
  ) {}

  getByUserId(userId: string): Observable<TeamAssociation[]> {
    return this.afs
      .collection<TeamAssociation>(
        this.collectionName,
        (ref) => ref.where('userId', '==', userId)
      )
      .valueChanges({ idField: 'id' });
  }

  getEnrichedTeamAssociations(userId: string): Observable<TeamAssociation[]> {
    return this.getByUserId(userId).pipe(
      take(1), // Ensures the observable completes after emitting the first value
      switchMap((associations: TeamAssociation[]) => {
        if (associations.length === 0) {
          // No associations, return an empty array
          return of([]);
        }
  
        // Map each association to an observable that fetches team details
        const enrichedAssociations$ = associations.map((association) =>
          this.teamService.getById(association.teamId!).pipe(
            take(1), // Take the first emitted value from the teamService call
            map((team) => ({
              ...association,
              teamName: team?.name || "", // Enrich with teamName or fallback to an empty string
            })),
            catchError(() => of({ ...association, teamName: "" })) // Handle errors gracefully
          )
        );
  
        // Use forkJoin to combine all enriched associations into a single array
        return forkJoin(enrichedAssociations$);
      })
    );
  }

  getCountById(teamId: string): Promise<number> {
    const items = this.afs.collection<TeamAssociation>(this.collectionName)
      .ref.where('teamId', '==', teamId)
      .get()
      .then(snapshot => snapshot.docs.length);
    
    return items;
  }

  // Bulk insert method
  createMultiple(teams: TeamAssociation[]): Promise<void> {
    const batch = this.afs.firestore.batch();
    const collectionRef = this.afs.collection(this.collectionName).ref;

    teams.forEach(team => {
      const docRef = collectionRef.doc(); // Creates a new document with auto-generated ID
      batch.set(docRef, team);
    });

    return batch.commit();
  }

  async replaceMultipleByUser(userId: string, newAssociations: TeamAssociation[]): Promise<void> {
    const batch = this.afs.firestore.batch();
    const snapshot = await this.afs.collection<TeamAssociation>(this.collectionName).ref.where('userId', '==', userId).get();

    snapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    newAssociations.forEach(association => {
      const newDocRef = this.afs.collection(this.collectionName).doc().ref;
      batch.set(newDocRef, { ...association, userId });
    });

    await batch.commit();
  }
}
