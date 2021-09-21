import { Request, Response, NextFunction } from 'express';
import { MessagesEntity } from '../../../../core/infra/data/database/entities';

async function validMessage(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const messageAlreadyExists = await MessagesEntity.findOne(id);
  if (!messageAlreadyExists) {
    return res.status(400).json({
      success: false,
      msg: 'message not found',
      data: null,
    });
  }

  next();
}

export { validMessage };
