// This API is written on a node server. The client would not know if we had written it in python, etc.
// API encapsualtes caller from  implementation. 

// we import passport packages required for authentication
import PassportLocal from 'passport-local';
import passport from 'passport';

import { User } from '../entities/user';

const init = (DataSource) => {
  // Telling passport we want to use a Local Strategy. In other words,
  // we want login with a username/email and password
  passport.use(new PassportLocal.Strategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      const repo = DataSource.getRepository(User);
      return repo.findOneOrFail({ where: { email } }).then(
        (dbUser) => {
          if (dbUser.password !== password) {
            return done(null, false, {
              message: 'Incorrect password.',
            });
          }
          // If none of the above, return the user
          return done(null, dbUser);
        },
        () => done(null, false, { message: 'no user found' }),
      );
    },
  ));
  //
  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
  // Just consider this part boilerplate needed to make it all work
  passport.serializeUser((user, done) => {
    process.nextTick(() => {
      done(null, user.id)
    });
  });
  //
  passport.deserializeUser((id, done) => {
    DataSource.getRepository(User).findOneOrFail({where: { id }}).then(
      (foundUser) => {
        done(null, foundUser);
      },
    )});
};
//
// Exporting our configured passport
export default init;
