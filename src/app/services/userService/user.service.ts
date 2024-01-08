import { Injectable } from '@angular/core';
import db from '../../config/firebase';
import { collection, doc, getDocs, or, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { ReadUserDTO, User } from '../../interfaces/user';
import { Cookie } from 'src/app/interfaces/cookie';

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

  async Login(id : string, senha: string) : Promise<Cookie> {
    var data: Cookie = {
      type: 0,
      name: 'Senha incorreta'
    }

    const user = await getDocs(query(collection(db, `Usuarios`), 
      or(where('id', '==', id), where('matricula', '==', id))))

    if(user.empty) {
      data.name = "Nenhum usuario encontrado"
      return data
    }

    user.forEach(doc => {
      if(doc.data()['senha'] == senha) {
        data.name = doc.data()['nome']
        data.type = doc.data()['tipo']
      }
    })

    return data
  }
}
