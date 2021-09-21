import { Router } from 'express';
import { CacheRepository } from '../../../../core/infra/repositories/cache.repository';
import {
  EMvc,
  MvcController,
  routerMvcAdapter,
} from '../../../../core/presentation';
import MessagesRepository from '../../infra/repositories/messages.repository';
import { MessageController } from '../controllers';

import {
  validMessage,
  validDetails,
  validDescription,
} from '../middlewares/index';

const makeController = (): MvcController => {
  const repository = new MessagesRepository();
  const cache = new CacheRepository();

  return new MessageController(repository, cache);
};

export default class MessagesRoutes {
  public init(): Router {
    const routes = Router();

    routes.get('/messages', routerMvcAdapter(makeController(), EMvc.INDEX));

    routes.get(
      '/messages/:id',
      [validMessage],
      routerMvcAdapter(makeController(), EMvc.SHOW),
    );

    routes.get(
      '/messages/users/:id',
      routerMvcAdapter(makeController(), EMvc.GETALL),
    );

    routes.post(
      '/messages/:id',
      [validDetails, validDescription],
      routerMvcAdapter(makeController(), EMvc.STORE),
    );

    routes.put(
      '/messages/:id',
      [validMessage],
      routerMvcAdapter(makeController(), EMvc.UPDATE),
    );

    routes.delete(
      '/messages/:id',
      [validMessage],
      routerMvcAdapter(makeController(), EMvc.DELETE),
    );

    return routes;
  }
}
