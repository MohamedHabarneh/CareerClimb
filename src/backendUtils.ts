import type {Collection} from "mongodb";
import type {User, UserWithoutId} from "./types/user";
import type {registerFormData} from "./types/form";
import type { Job } from "./types/job";
import type { Company } from "./types/company"
import bcryptjs from 'bcryptjs';

//followed similar format to https://github.com/consultingninja/svelteJWTAuth/blob/main/src/backendUtils.ts

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
}

export const FindJobByCompanyAndTitle = async (collection: Collection, companyName: string, jobTitle: string) => {
    const projection = { _id: 0};
    console.log(projection, companyName, jobTitle);
    const jobRes = await collection.findOne({company:companyName, jobTitle:jobTitle },{projection})
    console.log("job result: ", jobRes);
    return jobRes;
}

export const FindCompanyByName = async (collection: Collection, company: string) => {
    const projection = { _id: 0, companyName: 1 };
    console.log(projection, company);
    const companyRes = await collection.findOne({companyName:company},{projection})
    console.log("company result: ", companyRes);
    return companyRes;
}

export const InsertNewCompany = async (collection: Collection, newCompany: Company) => {
    const company = await collection.insertOne(newCompany);
    return company;
}
    