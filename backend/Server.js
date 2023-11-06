const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello word!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});