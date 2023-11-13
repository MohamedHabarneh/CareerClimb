
export interface registerFormData{
    weakPass: boolean,
    emailUsed: boolean,
    error: boolean,
    message: string,
    firstName: FormDataEntryValue,
    lastName: FormDataEntryValue,
    email: FormDataEntryValue,
    password: FormDataEntryValue,
    [key:string]: any
}

export interface loginFormData{
    email: FormDataEntryValue,
    password: FormDataEntryValue,
    [key:string]: any
}

export interface loginFormResponse extends Omit<loginFormData, 'passowrd'>{
    error: boolean,
    message: string
}

export interface forgotFormData{
    email: FormDataEntryValue
}

export interface forgotFormResponse extends forgotFormData{
    error: boolean,
    message: string,
    [key:string]: any
}

export interface resetFormData{
    password: FormDataEntryValue,
    confirmPassword: FormDataEntryValue,
}

export interface resetFormResponse{
    error: boolean,
    message: string,
    weakPass: boolean,
    [key:string]: any
}

type layoutOption = 'top' | 'side'