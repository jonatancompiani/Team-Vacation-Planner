import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {

  constructor(private firestore: AngularFirestore) { }

    private collectionName = 'TeamMembers';

  create(data: any) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection(this.collectionName)
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  update(id: string, data: any) {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .set(data);
  }

  get() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  delete(data: any) {
    return this.firestore
      .collection(this.collectionName)
      .doc(data.payload.doc.id)
      .delete();
  }
}