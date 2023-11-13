//deals with request
//lets you handle those request
import { start_mongo } from "$lib/mongo";
import { SALT } from "$env/static/private";
import { findUserByEmail } from "./backendUtils";
import { dbConn } from "$lib/dbConn";
import jwt from 'jsonwebtoken';
import type { UserWithoutPass } from "./types/user";
// import type { Job } from "./types/job";

// import jobss from "./jobs.json"

start_mongo().then(() => {
    console.log("Mongo started");
}).catch((e) => {
     console.error(e);
})


export async function handle({event, resolve}){
    const authToken = event.cookies.get('authToken');
    try{
        if(!authToken) event.locals.authedUser = undefined;
        const actualAuthToken = authToken || '';
        const claims = jwt.verify(actualAuthToken,SALT) as { authUser : UserWithoutPass};
        if(!claims) event.locals.authedUser = undefined;
        
        if(authToken && claims){
            //do soomething
            const collection = await dbConn();
            const user = await findUserByEmail(collection, claims.authUser.email.toString());
            event.locals.authedUser = user;
        }
    }
    finally{
        const response = await resolve(event);
        return response;
    }
    
    
}
// const jobCollection = await jobDbConn();

// for(let i = 0; i < jobss.length; i++){
//     let temp: Job = {
//         company: jobss[i]["company"],
//         jobTitle: jobss[i]["jobTitle"],
//         location: jobss[i]["location"],
//         description: jobss[i]["description"],
//         experienceLevel: jobss[i]["experienceLevel"],
//         position: jobss[i]["position"],
//         postDate: jobss[i]["postDate"],
//         jobLink: jobss[i]["jobLink"]
//     }
//     const insertedJob = await InsertNewJob(jobCollection, temp);
    
// }