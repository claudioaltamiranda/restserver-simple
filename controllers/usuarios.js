const { request, response } = require('express');

const getUsuarios = (req = request, res = response) => {
  const { page = 1, limit = 10 } = req.query;

  res.json({ page, limit });
};

const postUsuarios = (req = request, res = response) => {
  const id = req.params.id;

  const { nombre, edad } = req.body;

  res.json({ id, nombre, edad });
};

const putUsuarios = (req, res = response) => {
  res.json({ msg: 'put API!' });
};

const patchUsuarios = (req, res = response) => {
  res.json({ msg: 'patch API' });
};

const deleteUsuarios = (req, res = response) => {
  res.json({ msg: 'delete API!' });
};

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  patchUsuarios,
  deleteUsuarios,
};
