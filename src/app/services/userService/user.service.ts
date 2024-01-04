import { Injectable } from '@angular/core';
import db from '../../config/firebase';
import { collection, doc, getDocs, or, query, setDoc, updateDoc, where } from 'firebase/firestore';
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

      return "Sucesso ao registrar usuario"
    }
    catch(ex) {
      return ex
    }
  }

  async UpdateUser(user: User) {
    try {
      const docRef = doc(db, `Postos/${user.posto}/Usuarios`, user.id)

      await updateDoc(docRef, user)
      return "Sucesso"
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
      const user = await getDocs(query(collection(db, `Postos/${posto}/Usuarios`), 
        or(where('id', '==', id), where('matricula', '==', id))))

      if(user.empty) return 'Nenhum usuario encontrado'

      var type

      user.forEach(doc => {
        if(doc.data()['senha'] == senha) {
          type = doc.data()['tipo']
        }
      })

      if(type) return type

      return 'Senha incorreta'
    }
    catch(ex) {
      return ex
    }
  }
}
