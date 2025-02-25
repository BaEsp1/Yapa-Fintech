const { User } = require('../../dataBase/dataBase');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(parseInt(id))

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, phoneNumber, country, photoUrl } = req.body;

  try {
    const user = await User.findByPk(parseInt(id));

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.name = name || user.name;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.country = country || user.country;
    user.photoUrl = photoUrl || user.photoUrl;

    await user.save();

    res.status(200).json({ message: 'Usuario actualizado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Bannear un usuario
exports.banUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(parseInt(id));

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.state = false; 
    await user.save();

    res.status(200).json({ message: 'Usuario baneado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al bannear el usuario', error });
  }
};

exports.desBanUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(parseInt(id));
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      user.state = true; 
      await user.save();
  
      res.status(200).json({ message: 'Usuario desbaneado', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al desbannear el usuario', error });
    }
  };
