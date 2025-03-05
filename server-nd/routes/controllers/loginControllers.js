const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User , Portfoil , Balance} = require('./../../dataBase/dataBase')
const Secret_Key_JWT = process.env.Secret_Key_JWT

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
  const token = jwt.sign(payload, Secret_Key_JWT, { expiresIn: '12h' });
  return token;
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user && checkPassword(password, user.password)) {
    const token = generateToken(user);
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      success:true,
      token: token,
      email: user.email,
      userId: user.idUser,
    });
  } else {
    res.status(401).json({
      message: 'Credenciales incorrectas',
    });
  }
};

exports.register = async (req, res) => {
  const { name, lastName, birthDate, country, phoneNumber, email, password } = req.body;

  // console.log(req.body)
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        message: 'El correo electrónico ya está registrado',
      });
    }

    // Encriptar la contraseña
    const encryptedPassword = encryptPassword(password);
    const formattedBirthDate = new Date(birthDate);

    // Crear el usuario en la base de datos y esperar a que se guarde
    const newUser = await User.create({
      name : name,
      lastName : lastName,
      birthDate:  formattedBirthDate,  
      country: country ,
      phoneNumber: phoneNumber ,
      email : email,
      password: encryptedPassword,
      role: "user",
    });

    // Crear un balance inicial para el usuario
    const newBalance = await Balance.create({
      idUser: newUser.idUser,  // Asociar el balance al usuario recién creado
      deposited: 0,
      saved: 0,
      invested: 0,
      totalBalance: 0,
    });

    // Crear el portafolio con totalPrice en 0
    const newPortfoil = await Portfoil.create({
      idUser: newUser.idUser,
      totalPrice: 0,  
    });

    // Generar un token para el usuario
    const token = generateToken(newUser);

    res.status(201).json({
      success:true,
      message: 'Usuario registrado exitosamente',
      userId : newUser.idUser, 
      email: newUser.email,
      balance: newBalance,
      portfoil: newPortfoil, 
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno al registrar el usuario' });
  }
};
