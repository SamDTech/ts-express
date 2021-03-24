import { NextFunction, Request, Response } from 'express';
import { controller, get, use } from './decorators/index';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403).send('Not authorized');
  }
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
    <div>
      <div>You are Logged In</div>
      <a href='/logout'>Logout</a>
    </div>
    `);
    } else {
      res.send(`
    <div>
      <div>You are not logged In</div>
      <a href='/login'>Login</a>
    </div>
    `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send(`
    <div>
      <div>Welcome to protected Route</div>
     
    </div>
    `);
  }
}
