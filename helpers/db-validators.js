const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol${rol} no esta registrado en la BD`)
    }
}

const esRolValidoPut = async (rol ) => {
  if(rol !== undefined){
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
      throw new Error(`El rol${rol} no esta registrado en la BD`)
    }
  }
  
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error('El correo ya esta registrado')
    }
}

const existeUsuarioPorId = async( id ) => {
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const existeUsuario = await Usuario.findById( id ).exec();
      if ( !existeUsuario ) {
          throw new Error(`El id ${ id } no existe`);
      }
  } else {
      throw new Error(`${ id } no es un ID válido`);
  }
};


  module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    esRolValidoPut
  }