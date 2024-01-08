import { Injectable } from '@angular/core';
import db from '../../config/firebase';
import { collection, doc, getDocs, or, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReadUserDTO, User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async CreateUser(user: User) {
    try {
      const docRef = collection(db, 'Usuarios')

      await setDoc(doc(docRef, user.id), user)

      return "Sucesso ao registrar usuario"
    }
    catch(ex) {
      return ex
    }
  }

  async UpdateUser(user: User) {
    try {
      const docRef = doc(db, `Usuarios`, user.id)

      await updateDoc(docRef, user)
      return "Sucesso"
    }
    catch(ex) {
      return ex
    }
  }

  async FindUsers() {
    try {
      const q = await getDocs(query(collection(db, `Usuarios`),
      where('tipo', '!=', 2)))

      let ret : ReadUserDTO[] = []

      q.forEach(doc => {
        ret.push({
          id: doc.data()["id"],
          nome: doc.data()["nome"],
          posto: doc.data()["posto"],
          servicos: doc.data()["servicos"],
          tipo: doc.data()["tipo"],
          ativo: doc.data()["ativo"]
        })
      })

      return ret
    }
    catch(ex) {
      return []
    }
  }

  async Login(id : string, senha: string) {
    try {
      const user = await getDocs(query(collection(db, `Usuarios`), 
        or(where('id', '==', id), where('matricula', '==', id))))

      if(user.empty) return 'Nenhum usuario encontrado'

      var type = 10

      user.forEach(doc => {
        if(doc.data()['senha'] == senha) {
          type = doc.data()['tipo']
        }
      })

      console.log(type)

      if(type < 10) return type

      return 'Senha incorreta'
    }
    catch(ex) {
      return ex
    }
  }
}
