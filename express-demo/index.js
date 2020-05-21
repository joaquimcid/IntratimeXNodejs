const express = require('express');
const app = express();

// add json middle ware, allows to read json from body
app.use(express.json());

const courses = [
  {id: 1, name:'course1'},
  {id: 2, name:'course2'},
  {id: 3, name:'course3'},
  {id: 4, name:'course4'},
  {id: 5, name:'course5'},
];
app.get('/', (req, res)=> {
  res.send('Hello bitch');
});


app.get('/api/courses', (req, res)=> {
  res.send(courses);  
});


// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  
  if (course) res.send(course);
  // else res.status(404);
  else {
    const verboseMessage = `Course with id ${req.params.id} not found.`;
    res.status(404).send(verboseMessage);
  }
  // res.send(req.params);
});

// Create Course
app.post('/api/courses', (req, res) => {
  if(!req.body.name || req.body.name.length < 3)
  {
    res.status(400).send('Name is required and should be minium 3 characters.');
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});


// use environment variable called 'port' in case does not exists, 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));