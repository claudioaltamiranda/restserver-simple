const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error('No existe ese rol!');
  }
};

const emailExiste = async (correo = '') => {
  const existe = await Usuario.findOne({ correo });

  if (existe) {
    throw new Error('Ya existe un usuario con ese email!');
  }
};

const usuarioExistePorId = async (id) => {
  const existe = await Usuario.findById(id);

  if (!existe) {
    throw new Error('No existe un usuario con ese ID!');
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExistePorId,
};
