import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit'
import {redirect} from '@sveltejs/kit'
import { dbConn } from '$lib/dbConn.js'
import { findUserByEmail } from '../../backendUtils.js'
import { jobDbConn } from '$lib/dbConn.js'



export async function load ({locals}){
    let authedUser = undefined;
    if(!locals.authedUser){
        throw redirect(302, '/login');
    }

    authedUser = locals.authedUser;

    let user = undefined;

    try{
        const collection = await dbConn();
        user = findUserByEmail(collection,locals.authedUser.email.toString());
    }
    finally{
    }
    const collection = await jobDbConn();
    const topTwoJobs = await collection.find().limit(4).toArray();
    const serializableJobs = topTwoJobs.map((job: { [x: string]: any; _id: any }) => {
        const {_id, ...jobDataWithoutId} = job;
        return jobDataWithoutId;
        
    })
    return {newJobs : serializableJobs, authedUser: authedUser};
}







