import { Router } from 'express';
import { User } from './../entities/user';

export default (DataSource) => {    // DataSource connected to database's user info. Defined in server.js line 38.
    const router = Router();
    const userRepo = DataSource.getRepository(User);
    router.post('/signup',(request, response) => {
        console.log("jumped to signup")
        const {firstName, lastName, password, email} = request.body;    // Request.body is object with four attributes. 
        console.log(firstName, lastName, password, email)
        const newUser = userRepo.create({
            firstName,
            lastName,
            email,
            password
        })

        userRepo.save(newUser).then(() =>{  // Asynchronous. On success, send back response. Important in web front because web timeout. 
            response.send()
        }, (error) => {response.status(500).send(error)}) // Send error if user is not unique 
    });
    return router;
}