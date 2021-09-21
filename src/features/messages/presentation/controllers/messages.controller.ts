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
import MessagesRepository from '../../infra/repositories/messages.repository';

export class MessageController implements MvcController {
  readonly #repository: MessagesRepository;
  readonly #cache: CacheRepository;

  constructor(repository: MessagesRepository, cache: CacheRepository) {
    this.#repository = repository;
    this.#cache = cache;
  }

  public async index() {
    try {
      // verifico se existe no cache
      const cache = await this.#cache.get('messages:all');
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

      const messages = await this.#repository.getMessages();
      await this.#cache.set('messages:all', messages);

      return ok(messages);
    } catch (error) {
      return serverError();
    }
  }

  async delete(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    try {
      const result = await this.#repository.delete(id);
      this.#cache.del('messages:all');
      return ok(result);
    } catch (error) {
      return serverError();
    }
  }

  async store(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    try {
      const result = await this.#repository.create(id, request.body);

      this.#cache.del('messages:all');

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
      const cache = await this.#cache.get(`messages:${id}`);
      if (cache) {
        return ok(Object.assign({}, cache, { cache: true }));
      }

      const message = await this.#repository.getMessage(id);
      if (!message) {
        return notFound(new DataNotFoundError());
      }

      await this.#cache.setex(`messages:${id}`, message, 20);

      return ok(message);
    } catch (error) {
      return serverError();
    }
  }

  public async getAll(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;
    try {
      // consulto o cache
      const cache = await this.#cache.get(`messages-user:${id}`);

      if (cache) {
        return ok(Object.assign({}, cache, { cache: true }));
      }

      const message = await this.#repository.getMessageUser(id);
      if (!message) {
        return notFound(new DataNotFoundError());
      }

      await this.#cache.setex(`messages-user:${id}`, message, 20);

      return ok(message);
    } catch (error) {
      return serverError();
    }
  }

  getName(request: HttpRequest): Promise<HttpResponse> {
    throw new Error('Method not implemented.');
  }

  async update(request: HttpRequest): Promise<HttpResponse> {
    const { id } = request.params;

    try {
      const result = await this.#repository.update(id, request.body);

      this.#cache.del('messages:all');

      return ok(result);
    } catch (error) {
      return serverError();
    }
  }
}
