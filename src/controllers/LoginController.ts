import { NextFunction, Request, Response } from 'express';
import { get, controller, bodyValidator, post } from './decorators/index';

@controller('/auth')
class LoginController {
  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
              <form method='POST' action=''>

                <div>
                  <label>Email</label>
                  <input name='email'/>
                </div>

                <div>
                  <label>Password</label>
                  <input name='password' type='password'/>
                </div>
                <button type='submit' >Submit</button>
              </form>
        `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password && email === 'hi@hi.com' && password === '1234') {
      // mark this person as logged in
      req.session = { loggedIn: true };
      //redirect this person
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }
}
