const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User =require('../../dataBase/dataBase')

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const checkPassword = (inputPassword, storedPassword) => {
  return bcrypt.compareSync(inputPassword, storedPassword);
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
  const token = jwt.sign(payload, 'ajo-y-agua', { expiresIn: '1h' });
  return token;
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = User.find(user => user.email === email);

  if (user && checkPassword(password, user.password)) {
    const token = generateToken(user);
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: { id: user.id, email: user.email },
      token: token,
    });
  } else {
    res.status(401).json({
      message: 'Credenciales incorrectas',
    });
  }
};

exports.register = async (req, res) => {
  const { firstName, lastName, birthday, country, phone, email, password } = req.body;
  const existingUser = User.find(user => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: 'El correo electrónico ya está registrado',
    });
  }

  const encryptedPassword = encryptPassword(password);

  const newUser = {
    id: User.length + 1,
    firstName,
    lastName,
    birthday,
    country,
    phone,
    email,
    role: "user",
    password: encryptedPassword,
  };

  User.push(newUser);

  const token = generateToken(newUser);

  const newPortfoil = await Portfoil.create({
    idUser: newUser.idUser,
    totalPrice: 0,  
  });

  res.status(201).json({
    message: 'Usuario registrado exitosamente',
    user: { id: newUser.id, email: newUser.email },
    token: token,
    portfoil: newPortfoil,
  });
};
