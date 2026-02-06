import express from 'express';
const port = 8080;
import { join } from 'path';
const student = [
    { id: 1, name: 'nick'},
    {id}
]

const app = express();

app.get('/', (req, res) => {
    res.sendFile(join(import.meta.dirname, "index.html"));
})

app.get('/about', (req, res) => {
    res.send("My name is nick madison")
})

app.get('/about-us', (req, res) => {
    res.redirect('/about');
})


app.listen(port, () => console.log(`server is running on port ${port}`));