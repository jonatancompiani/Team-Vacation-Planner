import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TeamMember } from '../models/TeamMember';
import { map } from 'rxjs';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  private dbPath = '/TeamMembers';

  collection: AngularFirestoreCollection<TeamMember>;
  afs: AngularFirestore;

  constructor(private db: AngularFirestore) {
    this.afs = db;
    this.collection = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<TeamMember> {
    return this.collection;
  }

  create(data: TeamMember): any {
    return this.collection.add({ ...data });
  }

  update(data: TeamMember) {

     this.db.collection('TeamMembers', ref => ref.where('code', '==', data.code).limit(1))
            .valueChanges()
            .subscribe(member => 
              {
                
                this.collection.doc().set((member as TeamMember[])[0]);
              });
  }

  updateDoc(_id: string, member: TeamMember) {
    let doc = this.afs.collection('TeamMembers', ref => ref.where('id', '==', _id));

    doc.snapshotChanges().pipe(
      map((actions: any[]) => actions.map(a => {                                                      
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })))
      .subscribe((_doc: any) => {
       let id = _doc[0].payload.doc.id; //first result of query [0]
       this.afs.doc(`TeamMembers/${_id}`).update({vacations: member.vacations});
      })
  }

  delete(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }
}