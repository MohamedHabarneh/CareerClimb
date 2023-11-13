import type {ObjectId} from 'mongodb'

export interface User{
    _id: ObjectId,
    firstName: string,
    lastName: String,
    email: String,
    password: String,
    resetTimer: number | null | undefined
}

export interface UserWithoutId extends Omit<User, '_id'>{}
export interface UserWithoutPass extends Omit<User, 'password'>{}
