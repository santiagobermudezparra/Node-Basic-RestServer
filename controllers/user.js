
const {request,response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

 const usuariosGet = async(req = request, res = response) =>{


    const {limite = 5,desde = 0} = req.query;
    const query = {estado : true};
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
              .skip(Number(desde))
              .limit(Number(limite))

    ])

    res.json({
      total,
      usuarios
    });
  }

  const usuariosPost = async (req, res = response) =>{
    
   
    const {nombre, correo, password, rol, ...resto} = req.body;
    const usuario = new Usuario({nombre, correo,password,rol});


  
     //Encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);



    await usuario.save();

    res.status(201). json({
        msg : "Post Api - controller",
        usuario
    });
  }

  const usuariosPut = async (req, res = response) =>{

    const {id} = req.params;

    const { _id, password, google,correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        ok: true,
        usuario
    });
  }

  const usuariosPatch = (req, res = response) =>{

    res.json({
        ok: true,
        msg : "Patch Api - controller"
    });
  }

  const usuariosDelete = async(req, res = response) =>{

    const { id } = req.params;


    //Fisicamente borrar
    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado : false});


    res.json({
      usuario
    });
  }


  module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPatch,
    usuariosPost,
    usuariosPut
  }