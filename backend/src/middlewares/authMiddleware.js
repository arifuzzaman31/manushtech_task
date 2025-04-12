const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

  const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // return res.status(200).send({decoded});
    const user = await prisma.users.findUnique({
      where: { uid: decoded.uid }, 
      include: { roleInfo: true },
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid Token, Please authenticate.' });
  }
};

module.exports = auth;