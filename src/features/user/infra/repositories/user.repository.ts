import { UsersEntity } from '../../../../core/infra';
import { UserModel } from '../../domain/models';

export default class UserRepository {
  async getUsers(): Promise<UserModel[]> {
    const user = await UsersEntity.find();

    return user.map((message) => {
      return {
        id: message.id,
        name: message.name,
        password: message.password,
        repeat_password: message.repeat_password,
        startDate: message.createdAt,
        endDate: message.updatedAt,
      } as UserModel;
    });
  }

  async getUser(id: number): Promise<UserModel | undefined> {
    const user = await UsersEntity.findOne(id);

    if (!user) {
      return undefined;
    }

    if (user.id) {
      return {
        id: user.id,
        name: user.name,
        password: user.password,
        repeat_password: user.repeat_password,
        startDate: user.createdAt,
        endDate: user.updatedAt,
      };
    }
  }

  async getUserMessages(id: number): Promise<UserModel | undefined> {
    const user = await UsersEntity.findOne(id, { where: { idUser: id } });

    if (!user) {
      return undefined;
    }

    if (user.id) {
      return {
        id: user.id,
        name: user.name,
        password: user.password,
        repeat_password: user.repeat_password,
        startDate: user.createdAt,
        endDate: user.updatedAt,
      };
    }
  }

  async getUserName(name: string): Promise<UserModel | undefined> {
    const user = await UsersEntity.findOne({ where: { name } });

    if (!user) {
      return undefined;
    }

    if (user.id) {
      return {
        id: user.id,
        name: user.name,
        password: user.password,
        repeat_password: user.repeat_password,
        startDate: user.createdAt,
        endDate: user.updatedAt,
      };
    }
  }

  async create(params: UserModel): Promise<UserModel> {
    const { name, password, repeat_password } = params;

    const user = await UsersEntity.create({
      name,
      password,
      repeat_password,
    }).save();

    return Object.assign({}, params, user);
  }

  async update(id: number, params: UserModel) {
    const { name, password, repeat_password } = params;

    const result = await UsersEntity.update(id, {
      name,
      password,
      repeat_password,
    });

    return Object.assign({}, params, result);
  }

  async delete(id: number) {
    return await UsersEntity.delete(id);
  }
}
