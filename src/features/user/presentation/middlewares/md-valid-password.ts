import { Request, Response, NextFunction } from 'express';
import { IPassword } from '../interfaces/index';

function validPassword(req: Request, res: Response, next: NextFunction) {
  const { password, repeat_password }: IPassword = req.body;

  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Please, enter the password',
      data: null,
    });
  }

  if (password.trim().length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Minimum characters are eight',
      data: null,
    });
  }

  if (!repeat_password) {
    return res.status(400).json({
      success: false,
      message: 'Please, enter the password again',
      data: null,
    });
  }

  if (repeat_password.trim().length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Minimum characters are eight',
      data: null,
    });
  }

  if (password !== repeat_password) {
    return res.status(400).json({
      success: false,
      message: 'Passwords do not match',
      data: null,
    });
  }

  next();
}

export { validPassword };
