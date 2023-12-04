import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit'
import type {UserWithoutPass} from '../../types/user.js'
import {redirect} from '@sveltejs/kit'
import { dbConn } from '$lib/dbConn.js'
import { SALT } from '$env/static/private'
import jwt from 'jsonwebtoken'
import { findUserByEmail } from '../../backendUtils.js'
import { jobDbConn } from '$lib/dbConn.js'



export async function load ({locals}){
    let authedUser = undefined;
    if(!locals.authedUser){
        throw redirect(302, '/login');
    }
    authedUser = locals.authedUser;

    return {authedUser: authedUser};
}







