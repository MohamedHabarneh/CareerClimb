import type {Collection} from "mongodb";
import type {User, UserWithoutId} from "./types/user";
import type {registerFormData} from "./types/form";
import type { Job } from "./types/job";
import bcryptjs from 'bcryptjs';

export const registerUser = async (collection: Collection, user: UserWithoutId) => {
    const register = await collection.insertOne(user);
    return register
}


export const returnEmailList = async (collection: Collection): Promise<string[]> => {
    const projection = {email:1, _id:0}
    const users = await collection.find().project(projection).toArray();
    const emailList:string[] = users.map((user) => {
        return user.email.toString();
    });
    return emailList;
}

//used for reseting password
export const findUserByEmail = async (collection: Collection, email: string) => {
    const projection = {email:1,firstName: 1, _id:0}
    const user = await collection.find({email:email}).project(projection).toArray();
    console.log(user);
    console.log("Email result", user[0])
    return JSON.parse(JSON.stringify(user[0],(key,value) => key === "_id"? value.toString(value) : value));
}  

//used for reseting password
export const findUserByEmailWithPassword = async (collection: Collection, email: string) => {
    // console.log(collection, email);
    const projection = {email:1,_id:0, password:1, resetTime: 1}
    const user = await collection.find({email:email}).project(projection).toArray();
    // console.log(user);
    console.log("Email result", user[0])
    return JSON.parse(JSON.stringify(user[0],(key,value) => key === "_id"? value.toString(value) : value));
}  

export const InsertNewJob = async (collection: Collection, jobPost : Job) => {
    const job = await collection.insertOne(jobPost);
    return job;
    
    
    
    //No longer needed since its done somewhere else 
    // export const registerFormToUserWithoutId = async (form:registerFormData): Promise<UserWithoutId> => {
    //     // console.log(form);
    //     // const pass:string = form.get('password');
    //     // console.log(form.password, typeof(form.password));
    //     const hashedPass = await bcryptjs.hash(form.password.toString(),12);
    //     console.log("Hashed pass: " , hashedPass);
    
    //     const user = {
    //         firstName:form.firstName.toString(),
    //         lastName:form.lastName.toString(),
    //         email:form.email.toString(),
    //         password: hashedPass,
    //         resetTimer: null,
    //     }
    
    //     return user;
    // }
}