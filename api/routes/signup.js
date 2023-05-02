import { Router } from 'express';

export default () => {
    const router = Router();
    const repo = DataSource.getRepository(User);
    router.post('/signup', (request, response) => {
        const {firstName, lastName, password, email} = request.body;
        const newUser = userRepo.create({
            firstName,
            lastName,
            email,
            password
        });
        userRepo.save(newUser).then(() => {
            response.send();
        });
    });
    return router;
}