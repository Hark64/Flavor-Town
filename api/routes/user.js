import { Router } from 'express';
import { User } from '../entities/user';
import isAuthenticated from '../middleware/isAuthenticated';
import { Not } from "typeorm"

export default (DataSource) => {
  const router = Router();
  const userRepo = DataSource.getRepository(User);

  router.use('/user', isAuthenticated).get('/user', (request, response) => {
      userRepo.find({where: {
        id: request.user.id
      }}).then(
            (user) => {
                response.send({ user })
            },
            () => response.status(500).send({ user, msg: 'Cannot find user'})
        );
  })

  router.use('/user', isAuthenticated).put('/user', (request, response) => {
    const { firstName, lastName, email, zipCode, id } = request.body;
    userRepo.find({where: {
      id: request.user.id
    }}).then(
          (user) => {
              response.send({ user })
          },
          () => response.status(500).send({ user, msg: 'Cannot find user'})
      );
  })

  return router;
}