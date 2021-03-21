import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    res.status(403).send('Not authorized');
  }
};



router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  if (email && password && email === 'hi@hi.com' && password === '1234') {
    // mark this person as logged in
    req.session = { loggedIn: true };
    //redirect this person
    res.redirect('/');
  } else {
    res.send('Invalid email or password');
  }
});

router.get('/', (req: Request, res: Response) => {
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
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
    <div>
      <div>Welcome to protected Route</div>
     
    </div>
    `);
});

export { router };
