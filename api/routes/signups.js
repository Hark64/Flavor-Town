import { Router } from 'express';

export default (DataSource) => {    // DataSource connected to database's user info. Defined in server.js line 38.
    const router = Router();
    const userRepo = Datasource.getRepository(User);
    router.post('/signup',(request, response) => {
        const {firstName, lastName, pwd, email} = request.body;    // Request.body is object with four attributes. 
        const newUser = userRepo.create({
            firstName,
            lastName,
            email,
            password: pwd
        })

        userRepo.save(newUser).then(() =>{  // Asynchronous. On success, send back response. Important in web front because web timeout. 
            response.send()
        }) 
    });
    return router;
}