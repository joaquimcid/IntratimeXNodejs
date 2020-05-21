const Joi = require('joi');

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

// GET ALL
app.get('/api/courses', (req, res)=> {
  res.send(courses);  
});

// GET BY ID
// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send(`Course with id ${req.params.id} not found.`);
  
  res.send(course);
});

// POST
// Create Course
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body, res); // result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
  // Validate
  const { error } = validateCourse(req.body, res); // result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Find the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`Course with id ${req.params.id} not found.`);

  course.name = req.body.name;
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send(`Course with id ${req.params.id} not found.`);
    
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course){
  const schema = {
    name: Joi.string().min(3).required()
  };
  
  return Joi.validate(course, schema);
}


// use environment variable called 'port' in case does not exists, 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));