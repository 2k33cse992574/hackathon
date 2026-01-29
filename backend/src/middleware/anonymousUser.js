import { v4 as uuid } from 'uuid';

export function anonymousUser(req, res, next) {
  let userId = req.headers['x-user-id'];

  if (!userId) {
    userId = uuid();
    res.setHeader('x-user-id', userId);
  }

  req.userId = userId;
  next();
}
