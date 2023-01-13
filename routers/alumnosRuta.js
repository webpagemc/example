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

    //Vamos a tener una funcion que genere el ID
    const generadorID = ()=>{

        let id = 1 //tenemos la variable ID
        
        const ultimoElemento = array[array.length - 1]//Tomamos el ultimo elemento del array (si existe)

        if(ultimoElemento){id = ultimoElemento.id + 1}
        //Si el ultimo elemento existe, vamos a hacer que id sea igual al id del ultimo elemento + 1

        return id;//retornamos el id
    }

    const idGenerado = generadorID() //declaramos la funcion en una constante id

    const nuevoAlumno = {...req.body,id:idGenerado }
    //Creamos un objeto nuevoAlumno que tenga todo lo que ponemos en el body y le agregamos la propiedad id con el valor idGenerado

    array.push(nuevoAlumno); //lo insertamos dentro del array

    fs.writeFileSync("./json/alumnos.json",JSON.stringify(array),(err)=>{ throw new Error(err) }) 
    //reescribimos el array con los datos insertados 

    res.send("El objeto se creo correctamente")

 });


module.exports = router //exportamos el router