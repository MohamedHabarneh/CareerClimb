import type { Actions, RequestEvent, ActionFailure, Redirect} from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import type {registerFormData} from "../../types/form";
import { registerUser, returnEmailList} from '../../backendUtils';
import {isPasswordValid} from "../../passwordReq";
import { dbConn } from "$lib/dbConn";
import bcryptjs from 'bcryptjs';
// import {client.db} from '$lib/mongo'


export const actions:Actions = {
    register: async({request}: RequestEvent): Promise<registerFormData|ActionFailure<registerFormData> | Redirect> =>{

        const registerData = await request.formData();
        const fName = registerData.get('firstName')??'';
        const lName = registerData.get('lastName')??'';
        const email = registerData.get('email')??'';
        const password = registerData.get('password')??'';

        let registerResponse: registerFormData = {
            weakPass: false,
            emailUsed: false,
            error: false,
            message: '',
            firstName: fName,
            lastName: lName,
            email: email,
            password: '',
        }
        // console.log("Check before pass: ", registerResponse);
        const isPassStrong = isPasswordValid(password.toString()); 
        // console.log("Password is good", password, isPassStrong)
        if(!isPassStrong){
            registerResponse.error = true;
            registerResponse.weakPass = true;
            registerResponse.message = 'Password does not meet requirement of atleast 1 UpperCase, 1 digit, 1 special symbol, and length of 8';
            return fail(400,registerResponse);
        }
        let collection = await dbConn();
        let emailList = [];
        try{
            emailList = await returnEmailList(collection);
            if(emailList.includes(registerResponse.email.toString())){
                registerResponse.error= true;
                registerResponse.emailUsed = true;
                registerResponse.message = 'This email address is already being used'
                return fail(400, registerResponse);
            }
        }
        catch(err){
            registerResponse.error = true;
            registerResponse.message = 'Error confirming email is available: Try again!';
            return fail(400, registerResponse);
        }

        registerResponse.password = password;
        // console.log("New registerResponse: " , registerResponse)
        // const userInsert = await registerFormToUserWithoutId(registerResponse);
        const hashedPass = await bcryptjs.hash(registerResponse.password.toString(),12);
        //Create new user to register
        const userInsert2 = {
         firstName: registerResponse.firstName.toString(),
         lastName: registerResponse.lastName.toString(),
         email: registerResponse.email.toString(),
         password: hashedPass,
         resetTimer: null,
        };
        console.log(userInsert2);
        const resultOfInsert = await registerUser(collection,userInsert2);
        console.log(resultOfInsert);
        
        if(resultOfInsert.acknowledged && resultOfInsert.insertedId) throw redirect(303,'/login');
        registerResponse.password = '';
        registerResponse.error = true;
        registerResponse.message = 'Error encountered while registering user!';
        return fail(503,registerResponse);
    },
}