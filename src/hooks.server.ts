//deals with request
//lets you handle those request
import { start_mongo } from "$lib/mongo";
import { SALT } from "$env/static/private";
import { findUserByEmail} from "./backendUtils";
import { dbConn } from "$lib/dbConn";
import jwt from 'jsonwebtoken';
import type { UserWithoutPass } from "./types/user";

// import type { Job } from "./types/job";
// import type { Company } from "./types/company";
// import jobss from "./output2.json"
// import jobss from "./jobs.json"

start_mongo().then(() => {
    console.log("Mongo started");
}).catch((e) => {
     console.error(e);
})

export async function handle({event, resolve}){
    console.time('Handle');
    const authToken = event.cookies.get('authToken');
    try{
        if(!authToken) event.locals.authedUser = undefined;
        const actualAuthToken = authToken || '';
        const claims = jwt.verify(actualAuthToken,SALT) as { authUser : UserWithoutPass};
        if(!claims) event.locals.authedUser = undefined;
        
        if(authToken && claims){
            const collection = await dbConn();
            const user = await findUserByEmail(collection, claims.authUser.email.toString());
            event.locals.authedUser = user;
        }
    }
    finally{
        const response = await resolve(event);
        console.timeEnd('Handle');
        return response;
    }
    
    
}

//For adding new job posts and companies fast way.
// const jobCollection = await jobDbConn();
// const compCollection = await companyDbConn();
// await compCollection.createIndex({companyName: 1}, {unique : true});
// for(let i = 0; i < jobss.length; i++){
//     const companyNameToSearch = (jobss[i]["company"] || "test").trim();
//     const jobTitleToSearch = (jobss[i]["job-title"] || "test").trim();
//     if(jobss[i]["company"] != null && jobss[i]["job-title"] != null){
//         console.log("Checking current company: ", jobss[i]["company"])
//         const findCompany = await FindCompanyByName(compCollection,(jobss[i]["company"] || "test").trim());
//         if(findCompany == null){
//             let companyTemp: Company = {
//                 companyName: jobss[i]["company"]
//             }
//             console.log("INSERTED NEW COMPANY!");
//             const insertNewCompany = await InsertNewCompany(compCollection, companyTemp);
//         }
//         // @ts-ignore
//         const findJob = await FindJobByCompanyAndTitle(jobCollection, jobss[i]["company"],jobss[i]["job-title"]);
//         if(findJob == null){
//             const temp: Job = {
//                 company: companyNameToSearch,
//                 jobTitle: jobTitleToSearch,
//                 location: jobss[i]["location"]?.trim(),
//                 description: jobss[i]["jobDescription"]?.trim(),
//                 experienceLevel: jobss[i]["level"]?.trim(),
//                 employmentType: jobss[i]["employmentType"]?.trim(),
//                 jobLink: jobss[i]["jobLink"]?.trim(),
//                 postDate: undefined,
//             };
//             const insertedJob = await InsertNewJob(jobCollection, temp);
//         }
//     }
// }