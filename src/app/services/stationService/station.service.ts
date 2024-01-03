import { Injectable } from '@angular/core';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from 'src/app/config/firebase';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor() { }

  async FindStationList(nome: string) {
    try {
      const result = await getDocs(collection(db, `Postos`))

      let ret : any[] = []

      result.forEach(doc => {
        if(doc.id.toUpperCase().includes(nome.toUpperCase())) {
          ret.push(doc.id)
        }
      })

      return ret
    }
    catch(ex) {
      return ex
    }
  }
}
