import { Router } from 'express';
import { Event } from '../entities/event';

export default (DataSource) => {
  const router = Router();
  const eventRepo = DataSource.getRepository(Event);
  router.post('/createevent', (request, response) => {
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
  return router;
}
