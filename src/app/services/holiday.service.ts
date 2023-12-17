import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Holiday } from '../models/Holiday';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  private dbPath = '/Holidays';

  collection: AngularFirestoreCollection<Holiday>;

  constructor(private firestore: AngularFirestore) {
    this.collection = firestore.collection(this.dbPath);
  }

  getAll() {
   return this.collection.valueChanges();
  }

  create(data: Holiday): any {
    return this.collection.add({ ...data });
  }

  update(id: string, data: any): Promise<void> {
    return this.collection.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }
}