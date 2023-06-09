import { Router } from 'express';
import { User } from '../entities/user';
import { Follow } from '../entities/follow';

export default (DataSource) => {
    const router = Router();
    const followResource = DataSource.getRepository(Follow);

    router.post('/users/:id/follow', (request, response) => {
        const userID = req.params.id;
        user.follow
    })
    return router;
}