const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPatch , usuariosPut} = require('../controllers/user');
const { esRolValido, emailExiste , existeUsuarioPorId, esRolValidoPut} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

const roles = ['ADMIN_ROLE','USER_ROLE'];

router.get('/', usuariosGet )

  router.put('/:id',[
    check('id', ' No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( (rol) => esRolValidoPut(rol)),
    validarCampos
  ], usuariosPut);

  router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y mas de 6 letras').isLength({min : 6 }),
    check('correo','El correo no es valido').isEmail(),
    //check('rol','No es un rol Valido').isIn(roles),
    check('rol').custom( (rol) => esRolValido(rol)),
    check('correo').custom( emailExiste),
    validarCampos
  ], usuariosPost)

  router.delete('/:id', [
    check('id', ' No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ] ,usuariosDelete)

  router.patch('/',  usuariosPatch) 

module.exports = router; 