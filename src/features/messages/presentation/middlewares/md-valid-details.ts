import { Request, Response, NextFunction } from 'express';

function validDetails(req: Request, res: Response, next: NextFunction) {
  const { details }: { details: string } = req.body;

  if (!details) {
    return res.status(400).json({
      success: false,
      message: 'Please, enter details',
      data: null,
    });
  }

  next();
}

export { validDetails };
