const express = require('express'); 
const cors = require('cors'); // for CORS config
const { findUserByBIB39, connectDB } = require('./Database');

connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: '*' 
}));
  
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello word!');
});

app.get('/users/:id', async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await findUserByBIB39(userID);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/users', async (req, res)=> {
  const userId = req.body.userId;
  const userName = req.body.userName;

  console.log(userId, userName);

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

