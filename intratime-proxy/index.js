
const express = require('express');
const app = express();
// add json middle ware, allows to read json from body
app.use(express.json());


app.get('/api/login/:email/:password', (req, res) => {
  
  const loginCredentials = {
    email: req.params.email,
    password: req.params.password    
  };

  
  res.send(loginCredentials);
});




// use environment variable called 'port' in case does not exists, 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));