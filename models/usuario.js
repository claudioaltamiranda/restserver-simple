const { model, Schema } = require('mongoose');

const schema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio!'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio!'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  imagen: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, 'El rol es requerido!'],
    enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

schema.methods.toJSON = function () {
  const { __v, password, _id, ...u } = this.toObject();
  u.uid = _id;
  return u;
};

const usuario = model('Usuario', schema);

module.exports = usuario;
