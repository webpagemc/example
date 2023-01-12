const express = require("express");
const router = express.Router();
const fs = require("fs")

//la funcion readFile nos retorna lo que haya dentro de alumnos.json
const todosLosAlumnos = JSON.parse(fs.readFileSync("./json/alumnos.json","utf8",(error)=>{ throw new Error(error) }));

const array = []

array.push(...todosLosAlumnos);


router.get("/alumnos", async(req,res)=>{ 

    res.send(array); //Enviamos como respuesta el array alumnos

});

router.post("/alumnos", async(req,res)=>{ 

    const nuevoAlumno = req.body; //tomamos lo que hay en el body de la peticion

    array.push(nuevoAlumno); //lo insertamos dentro del array

    fs.writeFileSync("./json/alumnos.json",JSON.stringify(array),(err)=>{ throw new Error(err) }) 
    //reescribimos el array con los datos insertados 

    res.send("El objeto se creo correctamente")

 });


module.exports = router //exportamos el router