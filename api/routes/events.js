import { Router } from 'express';
import { Event } from '../entities/event';
import isAuthenticated from '../middleware/isAuthenticated';

export default (DataSource) => {
  const router = Router();
  const eventRepo = DataSource.getRepository(Event);
  
  router.use('/createevent', isAuthenticated).post('/createevent', (request, response) => {
    const { title, location, description } = request.body;
    const newEvent = eventRepo.create({
      title, 
      location,
      description
    });
    eventRepo.save(newEvent).then(() => {
      response.send();
    });
  });

  router.use('/events', isAuthenticated).get('/events', (request, response) => {
      eventRepo.find().then(
            (events) => {
                response.send({ events })
            },
            () => response.send({ events: [] })
        );
    })

  return router;
}
