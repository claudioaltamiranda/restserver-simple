const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({ msg: 'No existe token en el request!' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const autenticado = await Usuario.findById(uid);
    if (!autenticado) {
      res
        .status(401)
        .json({ msg: 'No existe usuario habilitado para esta operación!' });
    }

    if (!autenticado.estado) {
      res
        .status(401)
        .json({ msg: 'El usuario esta desactivado, operación no permitida!' });
    }

    req.usuarioAutenticado = autenticado;
    req.uid = uid;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Token no válido!' });
  }
};

module.exports = {
  validarJWT,
};
