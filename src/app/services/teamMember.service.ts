import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TeamMember } from '../models/TeamMember';


@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private dbPath = '/TeamMembers';

  collection: AngularFirestoreCollection<TeamMember>;

  constructor(private db: AngularFirestore) {
    this.collection = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<TeamMember> {
    return this.collection;
  }

  create(data: TeamMember): any {
    return this.collection.add({ ...data });
  }

  update(id: string, data: any): Promise<void> {
    return this.collection.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }
}