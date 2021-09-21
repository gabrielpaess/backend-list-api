import { Request, response, Response } from 'express';
import { CacheRepository } from '../../../../core/infra/repositories/cache.repository';
import {
  DataNotFoundError,
  HttpRequest,
  HttpResponse,
  MvcController,
  notFound,
  ok,
  serverError,
} from '../../../../core/presentation';
import UsersEntity from '../../infra/repositories/user.repository';

export class UserController implements MvcController {
  readonly #repository: UsersEntity;
  readonly #cache: CacheRepository;

  constructor(repository: UsersEntity, cache: CacheRepository) {
    this.#repository = repository;
    this.#cache = cache;
  }

  public async index() {
    try {
      // verifico se existe no cache
      const cache = await this.#cache.get('users:all');
      // valido se existe cache
      if (cache) {
        return ok(
          cache.map((message: any) =>
            Object.assign({}, message, {
              cache: true,
            }),
          ),
        );
      }

      const messages = await this.#repository.getUsers();

      await this.#cache.set('users:all', messages);

      return ok(messages);
    } catch (error) {
      return serverError();
    }
  }

  async delete(request: HttpRequest): Promise<HttpResponse> {
    const { uid } = request.params;

    try {
      const result = await this.#repository.delete(uid);
      return ok(result);
    } catch (error) {
      return serverError();
    }
  }

  async store(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    try {
      const result = await this.#repository.create(request.body);

      this.#cache.del('users:all');

      return ok(result);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }

  public async show(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    try {
      // consulto o cache
      const cache = await this.#cache.get(`user:${id}`);
      if (cache) {
        return ok(Object.assign({}, cache, { cache: true }));
      }

      const message = await this.#repository.getUser(id);
      if (!message) {
        return notFound(new DataNotFoundError());
      }

      await this.#cache.setex(`user:${id}`, message, 20);

      return ok(message);
    } catch (error) {
      return serverError();
    }
  }

  public async getName(request: HttpRequest): Promise<HttpResponse> {
    const { name } = request.params;

    console.log(name);
    try {
      // consulto o cache
      const cache = await this.#cache.get(`user-name:${name}`);
      if (cache) {
        return ok(Object.assign({}, cache, { cache: true }));
      }

      const user = await this.#repository.getUserName(name);
      if (!user) {
        return notFound(new DataNotFoundError());
      }

      await this.#cache.setex(`user-name:${name}`, user, 20);

      return ok(user);
    } catch (error) {
      return serverError();
    }
  }

  public async getAll(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    try {
      // consulto o cache
      const cache = await this.#cache.get(`user-message:${id}`);
      if (cache) {
        return ok(Object.assign({}, cache, { cache: true }));
      }

      const message = await this.#repository.getUserMessages(id);
      if (!message) {
        return notFound(new DataNotFoundError());
      }

      await this.#cache.setex(`user-message:${id}`, message, 20);

      return ok(message);
    } catch (error) {
      return serverError();
    }
  }

  async update(request: HttpRequest): Promise<HttpResponse> {
    const { uid } = request.params;
    console.log(request.body);

    try {
      const result = await this.#repository.update(uid, request.body);

      return ok(result);
    } catch (error) {
      console.log(error);
      return serverError();
    }
  }
}
