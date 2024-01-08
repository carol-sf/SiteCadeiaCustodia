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
    servicos: string[],
    sections: ''
}

export interface ReadUserDTO {
  id: string,
  nome: string,
  posto: string,
  servicos: string,
  tipo: UserType,
  ativo: boolean
}

export enum UserType {
    Perito = 0,
    Admin = 1,
    SuperAdmin = 2,
    Operador = 3
}

export function getUserTypeName(userType: UserType): string {
  switch(userType) {
    case UserType.Perito: return "Perito";
    case UserType.Admin: return "Admin";
    case UserType.SuperAdmin: return "Super Admin";
    case UserType.Operador: return "Operador";
  }
}
