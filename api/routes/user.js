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

  router.use('/user/getCurrentUser', isAuthenticated).get('/user/getCurrentUser', (request, response) => {
    response.send(request.user);
  })


  router.use('/user', isAuthenticated).put('/user', (request, response) => {
    const { firstName, lastName, email, zipCode, id } = request.body;
    console.log("In put user, id is ", id)
    userRepo.find({where: {
      id: id
    }}).then(
          (user) => {
            console.log("found user about to edit in user.js");
            user.firstName = firstName
            user.lastName = lastName
            user.zipCode = zipCode
            user.email = email
            userRepo.save(user).then(() => {  //copied from signup
              response.send({ user });
            })
          },
          () => response.status(500).send({ user, msg: 'Cannot find user'})
    );

  })

  return router;
}