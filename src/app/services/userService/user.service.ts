import { Injectable } from '@angular/core';
import db from '../../config/firebase';
import { and, collection, doc, getDocs, or, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async CreateUser(user: User) {
    try {
      const docRef = collection(db, `Postos/${user.posto}`, "Usuarios")

      await setDoc(doc(docRef, user.id), user)
      return "sucesso"
    }
    catch(ex) {
      return ex
    }
  }

  async UpdateUser(user: User) {
    try {
      const docRef = doc(db, `Postos/${user.posto}/Usuarios`, user.id)

      await updateDoc(docRef, user)
      return "sucesso"
    }
    catch(ex) {
      return ex
    }
  }

  async FindUsers(posto: string) {
    try {
      const query = await getDocs(collection(db, `Postos/${posto}/Usuarios`))

      let ret : any[] = []

      query.forEach(doc => {
        ret.push({
          ...doc.data()
        })
      })

      return ret
    }
    catch(ex) {
      return ex
    }
  }

  async Login(posto: string, id : string, senha: string) {
    try {
      const q = query(collection(db, `Postos/${posto}/Usuarios`), and(or(where('id', '==', id), where('matricula', '==', id)), 
        where('senha', '==', senha)))

      const result = await getDocs(q)

      if(result.empty) return "Nenhum usuario encontrado"

      return 'sucesso'
    }
    catch(ex) {
      return ex
    }
  }
}
