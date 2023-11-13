import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit'
import type {UserWithoutPass} from '../../types/user.js'
import {redirect} from '@sveltejs/kit'
import { dbConn } from '$lib/dbConn.js'
import { SALT } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { findUserByEmail } from '../../backendUtils.js'
import { jobDbConn } from '$lib/dbConn.js'



export async function load ({ fetch, params, locals}){
    if(!locals.authedUser){
        throw redirect(302, '/login');
    }

    let user = undefined;

    try{
        const collection = await dbConn();
        user = findUserByEmail(collection,locals.authedUser.email.toString());
    }
    finally{
    }
    const collection = await jobDbConn();
    const topTwoJobs = await collection.find().limit(2).toArray();
    const serializableJobs = topTwoJobs.map(job => {
        const {_id, ...jobDataWithoutId} = job;
        return jobDataWithoutId;
        
    })
    return {newJobs : serializableJobs};
}







