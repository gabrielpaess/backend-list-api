import { Router } from 'express';
import { CacheRepository } from '../../../../core/infra/repositories/cache.repository';
import {
  EMvc,
  MvcController,
  routerMvcAdapter,
} from '../../../../core/presentation';
import UserRepository from '../../infra/repositories/user.repository';
import { UserController } from '../controllers';

import {
  validName,
  validPassword,
  validUser,
  userAlreadyExists,
} from '../middlewares';

const makeController = (): MvcController => {
  const repository = new UserRepository();
  const cache = new CacheRepository();

  return new UserController(repository, cache);
};

export default class MessagesRoutes {
  public init(): Router {
    const routes = Router();

    routes.get('/users', routerMvcAdapter(makeController(), EMvc.INDEX));

    routes.post(
      '/users',
      [validName, validPassword, userAlreadyExists],
      routerMvcAdapter(makeController(), EMvc.STORE),
    );

    routes.get(
      '/users/:id',
      [validUser],
      routerMvcAdapter(makeController(), EMvc.SHOW),
    );

    routes.get(
      '/users/name/:name',
      [validUser],
      routerMvcAdapter(makeController(), EMvc.GETNAME),
    );

    routes.put(
      '/users/:id',
      [validName, validPassword, validUser],
      routerMvcAdapter(makeController(), EMvc.UPDATE),
    );

    routes.delete(
      '/users/:id',
      [validUser],
      routerMvcAdapter(makeController(), EMvc.DELETE),
    );

    return routes;
  }
}
