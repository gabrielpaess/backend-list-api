import { Request, Response, NextFunction } from 'express';
import { UsersEntity } from '../../../../core/infra/data/database/entities';

async function userAlreadyExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name: nameUser } = req.body;
  let hasUser: any;

  if (nameUser) {
    hasUser = await UsersEntity.find({ where: { name: nameUser } });
    if (hasUser.length > 0) {
      return res.status(400).json({
        success: false,
        msg: 'User already exists',
        data: null,
      });
    }
  }

  next();
}

export { userAlreadyExists };
