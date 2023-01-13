const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/",require("./routers/alumnosRuta"));//Utilizamos las rutas de alumnos

const PORT = 8080;

app.listen(PORT,()=>{console.log("EL PUERTO ESTA FUNCIONANDO")});