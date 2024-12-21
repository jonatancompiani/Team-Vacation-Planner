
import { TeamMember } from '../models/TeamMember';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { catchError, forkJoin, map, mergeMap, Observable, of, take } from 'rxjs';
import { TeamAssociation, TeamAssociationService } from './teamAssociations.service';

export interface UserEnriched {
  id?: string;
  color: string;
  name: string;
  pictureUrl: string;
  vacations: Date[];
  teams: TeamAssociation[];
}

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private collectionName = '/TeamMembers';

  collection: AngularFirestoreCollection<TeamMember>;

  constructor
    (
      private afs: AngularFirestore,
      private teamAssociationService: TeamAssociationService,
    ) {
    this.collection = afs.collection(this.collectionName);
  }

  getById(id: string): Observable<TeamMember | undefined> {
    return this.afs.collection<TeamMember>(this.collectionName).doc(id).valueChanges();
  }

  getAll() {
    return this.afs.collection<TeamMember>(this.collectionName).valueChanges({ idField: 'id' });
  }

  create(team: TeamMember) {
    return this.afs.collection(this.collectionName).add(team);
  }

  update(id: string, data: any): Promise<void> {
    return this.afs.collection(this.collectionName).doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }

  getAllWithTeamNames(): Observable<UserEnriched[]> {
    return this.afs.collection<UserEnriched>(this.collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(
        take(1), // Ensure we only get one value from the collection
        mergeMap(users => {

          const userObservables = users.map(user =>
            this.teamAssociationService.getEnrichedTeamAssociations(user.id!).pipe(
              // Ensure the observable completes
              map(returnedValue => ({
                ...user,
                teams: (returnedValue || [])
                  .map(x => ({ id: x.teamId, name: x.teamName }))
                  .filter((team): team is { id: string, name: string } => !!team.id && !!team.name)
              })),
              catchError(() => of({ ...user, teams: [] })) // Handle errors
            )
          );

          // Combine all user observables into a single observable
          return forkJoin(userObservables);
        })
      );
  }
}