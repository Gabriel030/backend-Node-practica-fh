const {Router} = require("express");
const { check } = require("express-validator");
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require("../controllers/usuarios");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.get('/',  usuariosGet)
router.put('/:id',[
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),  
    validarCampos
] ,usuariosPut )

router.post('/', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser mas de 6 letras").isLength({min:6}),
    check("correo", "El correo no es valido").isEmail(),
    check("correo", "El correo ya existe").custom(correo => emailExiste(correo)),
    //check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"])
    check("rol").custom(esRoleValido),     
    validarCampos,
    ] , 
    usuariosPost)

router.delete('/:id', [
    check("id", "no es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)




module.exports = router; 
