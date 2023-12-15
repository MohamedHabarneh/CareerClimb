import { dbConn } from "$lib/dbConn";
import { findUserByEmail } from "../backendUtils";

//This is not working yet, still need to finish and add more unit tests
describe('findUserByEmail', () => {
    let collection: any
    beforeAll(async () => {
        collection = await dbConn();
    });

    afterAll(async () =>{
        //dont have to close connection since its all the same one not creating a new one
    });

    it("should find the user by email", async () => {
        const email = "comp@test.com"
        const user = await findUserByEmail(collection, email);
        console.log("Checking this user:",user);

        expect(user).toBeDefined();
        // expect(user.email).toBe(email);
    });

    it('should handle non-existing emails', async () => {
        const email = "nonexisting@test.com"
        const user = await findUserByEmail(collection, email);

        expect(user).toBeNull();
    })
})