import type { Actions, RequestEvent, ActionFailure, Redirect} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";
import type {loginFormResponse} from "../../types/form";
import {findUserByEmailWithPassword} from '../../backendUtils';
import { dbConn } from "$lib/dbConn";
import brcyptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SALT } from "$env/static/private";
import { user } from "../../stores";

export async function load({cookies}){
    const authToken = cookies.get('authToken')
    if(!authToken) return {clearUser: true}
    return {clearUser: false}
}


//utilized https://github.com/consultingninja/svelteJWTAuth for login/register function
export const actions:Actions = {
    login: async({cookies,request}: RequestEvent): Promise<loginFormResponse | ActionFailure<loginFormResponse> | Redirect> => {
        
        const loginFormData = await request.formData();
        const email = loginFormData.get('email')?.toString()?? '';
        const password = loginFormData.get('password')?.toString()?? '';

        console.log("Current", loginFormData);

        const loginResponse = {
            email,
            error: false,
            message: '',
        }

        try{
            const collection = await dbConn();
            const userAttempt = await findUserByEmailWithPassword(collection, email);
            const authAttempt = await brcyptjs.compare(password, userAttempt.password);

            console.log("Auth" , authAttempt);
            if(!authAttempt){
                loginResponse.error = true;
                loginResponse.message = "Invalid username or password";
            }
            if(authAttempt){
                const {password, ...userAttemptLoginMinusPassword} = userAttempt;
                console.log("WithoutPass", userAttemptLoginMinusPassword);
                const authToken = jwt.sign({authUser: userAttemptLoginMinusPassword}, SALT, {expiresIn:'24h'});
                cookies.set('authToken',authToken, {httpOnly: true, maxAge: 60*24, sameSite: 'strict'});
                // user.set(userAttemptLoginMinusPassword)
                throw redirect(302,'/dashboard');
            }
        }
        finally{
        }
        return loginResponse;
    } 
}


