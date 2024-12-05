import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Team {
  id?: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private collectionName = 'teams';

  constructor(private afs: AngularFirestore) {}

  getTeams(): Observable<Team[]> {
    return this.afs.collection<Team>(this.collectionName).valueChanges({ idField: 'id' });
  }

  addTeam(team: Team) {
    return this.afs.collection(this.collectionName).add(team);
  }

  updateTeam(id: string, team: Partial<Team>) {
    return this.afs.collection(this.collectionName).doc(id).update(team);
  }

  deleteTeam(id: string) {
    return this.afs.collection(this.collectionName).doc(id).delete();
  }
}
