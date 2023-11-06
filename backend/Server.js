const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: '*' 
}));
  
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello word!');
});

app.get('/users', (req, res) => {
    res.send('I\'m going to implement user info later');
});

app.get('/users:id', (req, res) => {
    res.send('I\'m going to implement user info later');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

