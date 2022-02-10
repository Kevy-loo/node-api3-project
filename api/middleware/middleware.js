const User = require('../users/users-model')

function logger(req, res, next) {
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl
  
  console.log(`${timestamp} ${method} to ${url}`)
  next()
  // DO YOUR MAGIC

}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
    const { id } = req.params;
    User.getById(id).then(user => {
      if (user) {
        req.user = user.id;
        req.actualUser = user
        next()
      }else {
        res.status(404).json({ message: 'user not found'})
      }
    })

  }


function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log('validateUser middleware')
  const {name} = req.body;
  if (name) {
    req.name = req.body;
    next()

  } else {
    res.status(400).json({ message: 'missing required name field'})
  }
}


function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log('validatePost middleware')
  const {text} = req.body;
  if(text) {
    req.text = text
    next()

  }else {
    res.status(400).json({ message: 'missing required text field'})
  }
}


// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost

}