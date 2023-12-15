
export function isPasswordValid(password: string): boolean{
    // '(?=.*[A-Z])' checks for atleast 1 uppercase
    // '(?=.*\d)' checks for atleast 1 digit
    // '(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-])' checks for special char
    // '.{8,}' minimum length of 8 chars
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|-]).{8,}$/; 
    return passwordRegex.test(password);
}