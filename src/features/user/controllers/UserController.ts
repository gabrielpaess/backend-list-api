import { Request, Response } from "express";
import { User } from "../../../core/data/database/entities/User";

export default class UserController {
  public async store(req: Request, res: Response) {
    const { name, cpf, email } = req.body;

    if (!name) {
      return res.status(400).json({
        msg: "O nome deve ser informado",
      });
    }
    if (!cpf) {
      return res.status(400).json({
        msg: "O cpf deve ser informado",
      });
    }
    if (cpf.length != 11) {
      return res.status(400).json({
        msg: "O cpf deve ter 11 números",
      });
    }
    if (!email) {
      return res.status(400).json({
        msg: "O email deve ser informado",
      });
    }

    try {
      const user = await new User(name, cpf, email).save();

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async index(req: Request, res: Response) {
    const users = await User.find();

    return res.json(users);
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findOne(id);
    if (!user) {
      return res.status(404).json({
        msg: "Usuário não encontrado",
      });
    }

    return res.json(user);
  }

  public async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findOne(id);
    if (!user) {
      return res.status(404).json({
        msg: "Usuário não encontrado",
      });
    }

    const result = await User.delete(id);

    return res
      .status(200)
      .json((result.affected as number) > 0 ? "User excluído" : "Não Removeu");
  }

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne(id);
    if (!user) {
      return res.status(404).json({
        msg: "Usuário não encontrado",
      });
    }

    const result = await User.update(id, {
      name,
      email,
    });

    return res.json(result);
  }
}
