import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit'
import { dbConn } from '$lib/dbConn.js'
import { jobDbConn } from '$lib/dbConn.js'
// import {redirect} from '@sveltejs/kit'
// import { findUserByEmail } from '../../backendUtils.js'



export async function load ({ fetch, params, locals}){
    let authedUser = undefined;
    // if(!locals.authedUser){
    //     throw redirect(302, '/login');
    // }

    authedUser = locals.authedUser;

    let user = undefined;

    try{
        const collection = await dbConn();
        // user = findUserByEmail(collection,locals.authedUser.email.toString());
    }
    finally{
    }
    const collection = await jobDbConn();
    const topTwoJobs = await collection.find().toArray();
    const serializableJobs = topTwoJobs.map(job => {
        const {_id, ...jobDataWithoutId} = job;
        return jobDataWithoutId;
        
    })
    return {newJobs : serializableJobs, authedUser: authedUser};
}







