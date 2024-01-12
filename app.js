//requiere
const express = require ('express');
const path = require ('path');

const app = express();
const port = 3005;

//configuracion
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'home.html'))
})

app.post('/register', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'register.html'))
})

app.get('/login', (req, res)=>{
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

app.listen(port, ()=>{
  console.log(`Nuestra app corre en http://localhost:${port}`);
})