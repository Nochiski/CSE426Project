const express = require('express'); 
const cors = require('cors'); // for CORS config
const { findUserByBIB39, findAllPosts, connectDB } = require('./Database');
const User = require('./UserInfo'); 
const Post = require('./Post')
const { generateAuthToken, authenticateToken } = require('./Auth');

connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: '*',
    exposedHeaders: ['x-auth-token'], 
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello word!');
});

app.post('/login', async (req, res) => {
  const userID = req.body.id;
  try {
    const user = await findUserByBIB39(userID);
    if (user) {
      const payload = {
        id: user._id,
        userId: user.userId
      };
      const token = generateAuthToken(payload);
      res.header('x-auth-token', token).json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/signUp', async (req, res) => {
  try {
    const { userId, userName } = req.body;
    const newUser = new User({ userId, userName });
    await newUser.save();

    const user = await findUserByBIB39(userId);
    const payload = {
      id: user._id,
      userId: user.userId
    };
    const token = generateAuthToken(payload);

    res.header('x-auth-token', token).status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/post', authenticateToken, async (req, res) => {
  try {
    const { userId, userName, title, content } = req.body;

    const newPost = new Post(userId, userName, title, content);
    await newPost.save();

    res.status(201).json();
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});

app.get('/post', async (req, res)=> {
  try {
    const docs = findAllPosts();
    res.json(docs);
  }catch(error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

