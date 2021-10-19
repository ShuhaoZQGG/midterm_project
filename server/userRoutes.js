const bcrypt = require('bcryptjs');

module.exports = function(router, database) {
  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addCustomer(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }
    database.getUserWithId(userId)
    .then(user => {
      if (!user) {
        res.send({error: "no user with that id"});
        return;
      }

      res.send({user: {id: userId, name: user.name, password: user.password, email: user.email, address: user.address }});
    })
    .catch(e => res.send(e));
  });

  const login =  function(email, password) {
    return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {id: userId, name: user.name, password: user.password, email: user.email, address: user.address }});
      })
      .catch(e => res.send(e));
  });

}
