const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {
  try {
    // correo
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ msg: 'No existe el usuario!' });
    }

    // estado
    if (!usuario.estado) {
      return res.status(400).json({ msg: 'El usuario no esta activo!' });
    }

    // contraseña
    const valid = bcryptjs.compareSync(password, usuario.password);
    if (!valid) {
      return res.status(400).json({ msg: 'Contraseña incorrecta!' });
    }

    // generar token
    const token = await generarJWT(usuario.id);

    res.json({ usuario, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hable con el administrador!' });
  }
};

const googleSignIn = (req = request, res = response, next) => {
  const { id_token } = req.body;

  res.status(200).json({
    id_token,
  });
};

module.exports = {
  login,
  googleSignIn,
};
