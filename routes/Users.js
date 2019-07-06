const router = require('express').Router();
const Users = require('../models/User');

// Find All
router.get('/', (req, res) => {
  Users.findAll()
    .then((Users) => {
      if (!Users.length) return res.status(404).send({ err: 'User not found' });
      res.send(`find successfully: ${Users}`);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by todoid
router.get('/Name/:Name/Phone/:Phone', (req, res) => {
  Users.findOneByName_Number(req.params.Name, req.params.Phone)
    .then((user) => {
      if (!user) return res.status(404).send({ err: 'User not found' });
      res.send(user);
    })
    .catch(err => res.status(500).send(err));
});

<<<<<<< HEAD
router.get('/Name/:Name/Login_id/:Login_id', (req, res) => {
  console.log('sssssssssssssssssssssss')
  Users.findOneByName_LoginId(req.params.Name, req.params.Login_id)
    .then((user) => {
      if (!user) return res.status(404).send({ err: 'User not found' });
      res.send(user);
    })
    .catch(err => res.status(500).send(err));
});

// Create new todo document
=======
// Create new user document
>>>>>>> f97af655ee50b4d743757f180a41b9072a9b19ce
router.post('/', (req, res) => {
  Users.create(req.body)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

// Update by todoid
router.put('/Login_id/:Login_id', (req, res) => {
  Users.updateByLoginId(req.params.Login_id, req.body)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

// Delete by todoid
router.delete('/Login_id/:Login_id', (req, res) => {
  Users.deleteByTodoid(req.params.Login_id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
