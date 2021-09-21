import { Request, Response, NextFunction } from 'express';
import { IName } from '../interfaces/index';

function validName(req: Request, res: Response, next: NextFunction) {
  const { name }: IName = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Please, enter the name',
      data: null,
    });
  }

  if (name.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: 'Minimum characters are three',
      data: null,
    });
  }

  next();
}

export { validName };
