import { Request, Response, NextFunction } from 'express';
import { UsersEntity } from '../../../../core/infra/data/database/entities';

async function validUser(req: Request, res: Response, next: NextFunction) {
  const { id, name } = req.params;
  let hasUser: any;

  if (id) {
    hasUser = await UsersEntity.findOne(id);
  }
  if (name) {
    hasUser = await UsersEntity.find({ where: { name } });
  }

  if (!hasUser || hasUser.length <= 0) {
    return res.status(400).json({
      success: false,
      msg: 'User not found',
      data: null,
    });
  }

  next();
}

export { validUser };
