const express = require('express'); 
const cors = require('cors'); // for CORS config
const { findUserByBIB39, findAllPosts, connectDB, findPostById } = require('./Database');
const User = require('./UserInfo');
const fs = require('fs').promises;
const path = require('path');
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


app.get('/uri/:uri', async (req, res) => {
  try {
    const filePath = `${__dirname}/uri/${req.params.uri}.json`; 
    const fileContent = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(fileContent); 
    res.status(200).json(json);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


app.post('/post', authenticateToken, async (req, res) => {
  try {
    const { userId, userName, title, content } = req.body;

    const newPost = new Post({userId, userName, title, content});
    await newPost.save();

    const nftMetadata = {
      name: "BlogPostNFT",
      description: `This certifies that the holder of this NFT is the owner of the post titled ${title}`,
      title: title,
      content: content,
      author: userName,
      postId: newPost._id.toString()
    };
    const metadataFilePath = path.join(__dirname, 'uri', `${newPost._id}.json`);
    await fs.writeFile(metadataFilePath, JSON.stringify(nftMetadata, null, 2));

    res.status(201).json(newPost);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/post', async (req, res)=> {
  try {
    const docs = await findAllPosts();
    res.json(docs);
  }catch(error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/post/:id', async (req, res) => {
  try {
    const doc = await findPostById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Post not found' });
    }
    console.log(doc);
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/posts/:postId/like', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.body.userId; 

    const post = await Post.findById(postId);

    if (post.likedUsers.includes(userId)) {
      post.likedUsers = post.likedUsers.filter(user => user !== userId);
    } else {
      post.likedUsers.push(userId);
    }

    await post.save();

    console.log(post.likedUsers)
    
    res.status(200).send(post); 
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post('/posts/:postId/nft', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.postId;
    const nftId = req.body.nftID;

    const post = await Post.findById(postId);

    post.NFTID = nftId

    await post.save();
    
    res.status(200).send(post); 
  } catch (error) {
    res.status(500).send(error.toString());
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

