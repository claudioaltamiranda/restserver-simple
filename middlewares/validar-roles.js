const { request, response } = require('express');

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuarioAutenticado) {
    return res.status(500).json({
      msg: 'Se esta intentando verificar el rol antes de validar el token!',
    });
  }

  const { rol, nombre } = req.usuarioAutenticado;
  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `El usuario: ${nombre} no esta autorizado para realizar esta operación!`,
    });
  }

  next();
};

const tieneRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuarioAutenticado) {
      return res
        .status(500)
        .json({ msg: 'Se quiere verificar rol antes de validar token!' });
    }
    if (!roles.includes(req.usuarioAutenticado.rol)) {
      return res
        .status(401)
        .json({
          msg: 'No dispone de los permisos requeridos para esta operación!',
        });
    }
    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
