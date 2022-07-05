
const {request,response} = require('express');


 const usuariosGet = (req = request, res = response) =>{

    const {q,nombre,apiKey} = req.query;

    res.json({
        ok: true,
        msg : "get Api - controller",
        q,
        nombre,
        apiKey
    });
  }

  const usuariosPost = (req, res = response) =>{

    const {nombre, edad} = req.body;

    res.status(201).json({
        ok: true,
        msg : "Post Api - controller",
        nombre,
        edad
    });
  }

  const usuariosPut = (req, res = response) =>{

    const {id} = req.params;

    res.json({
        ok: true,
        msg : "Put Api - controller",
        id
    });
  }

  const usuariosPatch = (req, res = response) =>{

    res.json({
        ok: true,
        msg : "Patch Api - controller"
    });
  }

  const usuariosDelete = (req, res = response) =>{

    res.json({
        ok: true,
        msg : "Delete Api - controller"
    });
  }


  module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
  }