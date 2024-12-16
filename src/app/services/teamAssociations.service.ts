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

  getAll(): Observable<TeamAssociation[]> {
    return this.afs.collection<TeamAssociation>(this.collectionName).valueChanges({ idField: 'id' });
  }

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

  create(team: TeamAssociation) {
    return this.afs.collection(this.collectionName).add(team);
  }

  update(id: string, team: Partial<TeamAssociation>) {
    return this.afs.collection(this.collectionName).doc(id).update(team);
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

  // Batch update method
  updateMultiple(updates: Array<{ id: string, data: Partial<TeamAssociation> }>): Promise<void> {
    const batch = this.afs.firestore.batch();

    updates.forEach(update => {
      const docRef = this.afs.collection(this.collectionName).doc(update.id).ref;
      batch.update(docRef, update.data);
    });

    return batch.commit();
  }

  delete(id: string) {
    return this.afs.collection(this.collectionName).doc(id).delete();
  }
}
