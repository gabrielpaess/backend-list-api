import { Request, Response, NextFunction } from 'express';

function validDescription(req: Request, res: Response, next: NextFunction) {
  const { description }: { description: string } = req.body;

  if (!description) {
    return res.status(400).json({
      success: false,
      message: 'Please, enter description',
      data: null,
    });
  }

  next();
}

export { validDescription };
