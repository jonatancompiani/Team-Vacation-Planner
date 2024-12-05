
import { TeamMember } from '../models/TeamMember';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private dbPath = '/TeamMembers';

  collection: AngularFirestoreCollection<TeamMember>;


  constructor(private firestore: AngularFirestore) {
    this.collection = firestore.collection(this.dbPath);
  }

  getAll() {
    return this.collection.valueChanges();
   }
  
   create(team: TeamMember) {
    return this.firestore.collection(this.dbPath).add(team);
  }

   update(id: string, data: any): Promise<void> {
     return this.collection.doc(id).update(data);
   }
 
   delete(id: string): Promise<void> {
     return this.collection.doc(id).delete();
   }
}