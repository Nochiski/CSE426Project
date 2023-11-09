const express = require('express'); 
const cors = require('cors'); // for CORS config
const { findUserByBIB39, connectDB } = require('./Database');
const User = require('./UserInfo'); // User 모델의 정확한 경로를 사용하세요


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
    console.log(user)
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/users', async (req, res) => {
  try {
    const { userId, userName } = req.body;
    const newUser = new User({ userId, userName });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

