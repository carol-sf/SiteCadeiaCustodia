import { Injectable } from '@angular/core';
import { db } from '../firebase/firebase-config';
import { or, and, collection, doc, getDocs, getDoc, updateDoc, deleteDoc, setDoc, query, where, CollectionReference, WithFieldValue} from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireStoreService<T extends { [x: string]: any; }> {

  constructor() { }

  async FindCollection(collectionName : string){
    try{
        const querySnapshot = await getDocs(collection(db, collectionName));

        let ret : any[] = []

        querySnapshot.forEach((doc)=>{
            ret.push({
                ...doc.data(),
            });
        });  

        return ret;
    }catch(error){
        return [];
    }
  }

  async FindByIdentifier(collectionName : string, identifier : string){ 
    try{ 
        const docRef = doc(db, collectionName, identifier);

        const dado = await getDoc(docRef);

        if(dado.exists()){
            return dado.data();
        }
        return 'erro';  
    }
    catch(error){
        return 'erro';
    }
  }

  async Add(entity : T, collectionName : string, identifier : string){
    try{
        await setDoc(doc(db, collectionName, identifier), entity);

        return 'sucesso';
    }catch(error){
        console.log(error);
        return 'erro';
    }
  }

  async Update(entity : T, collectionName : string, identifier : string){
    try{
        const docRef = doc(db, collectionName, identifier);

        await updateDoc(docRef, entity);

        return 'sucesso'
    } catch(error){
        return 'Erro ao atualizar dados';
    }
  }

  async Delete(collectionName : string, identifier : string){
    try{     
        await deleteDoc(doc(db, collectionName, identifier));

        return 'sucesso';
    }catch(error){
        return 'erro';
    }
  }
}
