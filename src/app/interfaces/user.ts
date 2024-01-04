import { AddPrefixToKeys } from "firebase/firestore";

export interface User extends AddPrefixToKeys<string, any> {
    id: string,
    matricula: string,
    nome: string,
    email: string,
    senha: string,
    posto: string,
    ativo: boolean,
    tipo: UserType,
    departamento: string,
    servicos: string[]
}

export enum UserType {
    Perito = 0,
    Admin = 1,
    SuperAdmin = 2,
    Operador = 3
}