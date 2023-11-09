const jwt = require('jsonwebtoken');
const secretKey = "SXdhbnRvZ29iYWNrdG9rb3JlYXBsemxldG1lYmViYWNr";

const generateAuthToken = (user) => {
  const payload = {
    id: user.id,
    userId: user.userId
  };
  console.log("user : ", user)
  console.log("payload : ", payload)

  const options = { expiresIn: '2h' };

  const token = jwt.sign(payload, secretKey, options);
  console.log(token)
  return token;
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403); 
      req.user = user;
      next(); 
    });
  };
  
module.exports = {generateAuthToken, authenticateToken}; 