import { MessagesEntity } from '../../../../core/infra';
import { Messsage } from '../../domain/models';

export default class MessagesRepository {
  async getMessages(): Promise<Messsage[]> {
    const messages = await MessagesEntity.find();

    return messages.map((message) => {
      return {
        id: message.id,
        description: message.description,
        details: message.details,
        idUser: message.idUser,
        startDate: message.createdAt,
        endDate: message.updatedAt,
      } as Messsage;
    });
  }

  async getMessage(id: number): Promise<Messsage | undefined> {
    const messages = await MessagesEntity.findOne(id, {
      relations: ['user'],
    });

    console.log(id);

    if (!messages) {
      return undefined;
    }

    if (messages.id) {
      return {
        id: messages.id,
        description: messages.description,
        details: messages.details,
        idUser: messages.idUser,
        startDate: messages.createdAt,
        endDate: messages.updatedAt,
      };
    }
  }

  async getMessageUser(id: number): Promise<Messsage[] | undefined> {
    const messages = await MessagesEntity.find({
      where: { idUser: id },
    });

    if (!messages) {
      return undefined;
    }

    const data = messages.map((item) => {
      return {
        id: item.id,
        description: item.description,
        details: item.details,
        idUser: item.idUser,
        startDate: item.createdAt,
        endDate: item.updatedAt,
      };
    });

    return data;
  }

  async create(idUser: string, params: Messsage): Promise<Messsage> {
    const { description, details } = params;

    const project = await MessagesEntity.create({
      description,
      details,
      idUser,
    }).save();

    return Object.assign({}, params, project);
  }

  async update(id: number, params: Messsage) {
    const { description, details } = params;

    const result = await MessagesEntity.update(id, {
      description,
      details,
    });

    return Object.assign({}, params, result);
  }

  async delete(id: number) {
    return await MessagesEntity.delete(id);
  }
}
