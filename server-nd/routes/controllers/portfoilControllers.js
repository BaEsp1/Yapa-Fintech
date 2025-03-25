
const { Portfoil, Instrument, PortfoilInstrument } = require('../../dataBase/dataBase');
  
  // actualizacion de portfoil
  exports.updatePortfoil = async (req, res) => {
    const { id } = req.params; 
    const { instruments } = req.body; 
  
    const userId = req.user.idUser;  
  
    if (parseInt(id) !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permisos para actualizar este portafolio.' });
    }
  
    try {
      const portfoil = await Portfoil.findByPk(id);
  
      if (!portfoil) {
        return res.status(404).json({ message: 'Portafolio no encontrado' });
      }
  
      for (let instrument of instruments) {
        const { idInstrument, quantity, pricePerUnit } = instrument;
  
        const portfoilInstrument = await PortfoilInstrument.findOne({
          where: { idPortfoil: portfoil.idPortfoil, idInstrument },
        });
  
        if (portfoilInstrument) {
          portfoilInstrument.quantity += quantity;
          portfoilInstrument.pricePerUnit = pricePerUnit; 
          await portfoilInstrument.save();
        } else {
          await PortfoilInstrument.create({
            idPortfoil: portfoil.idPortfoil,
            idInstrument,
            quantity,
            pricePerUnit,
          });
        }
  
        portfoil.totalPrice += quantity * pricePerUnit;
      }
  
      await portfoil.save();
  
      res.status(200).json({ message: 'Portafolio actualizado exitosamente', portfoil });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el portafolio', error });
    }
  };
  
  // Ver todos los portafolios (si es admin)
exports.getAllPortfoils = async (req, res) => {
    const { role } = req.user;
  
    if (role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permisos para acceder a todos los portafolios.' });
    }
  
    try {
      const portfoils = await Portfoil.findAll({
        include: [
          { model: User, as: 'user' }, 
          { model: Instrument, as: 'instruments' }, 
        ]
      });
  
      if (portfoils.length === 0) {
        return res.status(404).json({ message: 'No se encontraron portafolios.' });
      }
  
      res.status(200).json(portfoils);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los portafolios', error });
    }
  };
  

  // Ver el portafolio de un usuario (buscar por idUser)
  exports.getPortfoilByUserId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const portfoil = await Portfoil.findOne({
        where: { idUser: parseInt(id) },
        include: [
          {
            model: Instrument,
            as: 'instruments',  
          }
        ],
      });
  
      if (!portfoil) {
        return res.status(404).json({ message: 'Portafolio no encontrado' });
      }
  
      res.status(200).json(portfoil);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Error al obtener el portafolio', error });
    }
  };
  
  