export interface LoginUser extends UserCredentials {
    password: string,
    type: TypeUser,
}

export interface ReturnedUser extends UserCredentials, UserData {
    script?: string;
}

export interface UserCredentials {
    id: string,
}

export interface UserData {
    type: TypeUser,
    data: PartData | ProData,
    password: string
}

export interface PartData {
    gender: GenderUser,
    age: number,
    location: string
}

export interface ProData {
    website: string,
    url1: string,
    message1: string,
    url2?: string,
    message2?: string
    apiKey: string
}

export type TypeUser = 'particular' | 'professional';

type GenderUser = 'M' | 'F' | 'Apache Helicopter';