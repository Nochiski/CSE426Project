const jwt = require('jsonwebtoken');

const generateAuthToken = (user) => {
  const payload = {
    id: user.id,
    userId: user.userId
  };
  console.log("user : ", user)
  console.log("payload : ", payload)
  const secretKey = "SXdhbnRvZ29iYWNrdG9rb3JlYXBsemxldG1lYmViYWNr";

  const options = { expiresIn: '2h' };

  const token = jwt.sign(payload, secretKey, options);
  console.log(token)
  return token;
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); 
      req.user = user;
      next(); 
    });
  };
  
module.exports = {generateAuthToken, authenticateToken}; 