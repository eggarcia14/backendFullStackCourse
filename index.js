const express = require("express");
const app = express();
//const http = require("http"); //comand js

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy, very easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];


//const app = http.createServer((request, response) => {
//  //funcion callback argumento, se ejecuta cada vez que se haga un request
//  console.log(request.url);
//  response.writeHead(200, { "Content-Type": "application/json" });
//  response.end(JSON.stringify(notes));
//});

app.get('/', (request,response) => { //Procesa request a /
  response.send(`<h1> Manejo de Request POST/GET/DELETE </h1>`); 
});

app.get('/api/notes', (request,response) => { //Procesa request a /api/notes
  response.json(notes);
});

app.get('/api/notes/:id', (request,response) => { //Procesa request a /api/notes/ID, segmento dinamico (Obtiene el item con el ID solicitado)
  const id = Number(request.params.id) //id es el parametro de la ruta dinamica
  //console.log({id});
  const note = notes.find(note => note.id === id);
  if(note){
    response.json(note);
  }else{
    //response.send("Error 404");
    response.status(404).end();
  }
});

app.delete('/api/notes/:id', (request,response) => { 
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end();
  //response.json(notes);
})

app.post('/api/notes', (request,response) => { 
  const note = request.body

  if(!note || !note.content){
    return response.status(400).json({
      error: "note.Content is missing"
    })
  }


  const ids = notes.map(note => note.id)
  const idMax = Math.max(... ids)
  const newNote = {
    id: idMax + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = [... notes, newNote] //o notes.concat(newNote)
  response.status(201).json(newNote); //create status
  //console.log(note)
})

//En express a diferencia de http se inicia asincrono
const PORT = 3000;
//app.listen(PORT); HTTP
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); //Como puede existir una pequenia latencia se establece n callback que se ejecute cuando termine el servidor de levantarce
});
//console.log(`Server running on port ${PORT}`);
