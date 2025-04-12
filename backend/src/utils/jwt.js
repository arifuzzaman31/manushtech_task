const jwt = require('jsonwebtoken');
const prisma = require('../config/db.js'); // Assuming you have your Prisma client setup

const generateAccessToken = (uid) => {
  return jwt.sign({ uid: uid }, process.env.JWT_SECRET, {
    expiresIn: '6h',
  });
};

const generateRefreshToken = (uid) => {
  return jwt.sign({ uid: uid }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d', // Adjust as needed
  });
};
const upsertToken = async(userId, refreshToken) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

  try {
    const result = await prisma.tokens.upsert({
      where: {
        userId: userId, // Use userId for where clause
      },
      update: {
        refreshToken: refreshToken,
        expiresAt: expiresAt,
        isRevoked: false,
      },
      create: {
        userId: userId,
        refreshToken: refreshToken,
        expiresAt: expiresAt,
      },
    });
    return result;
  } catch (error) {
    console.error("Error upserting token:", error);
    throw error; // Rethrow the error for handling elsewhere
  }
}
const verifyRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokenRecord = await prisma.tokens.findUnique({
      where: { refreshToken },
    });

    if (!tokenRecord) {
      return null;
    }

    const newRefreshToken = generateRefreshToken(decoded.uid);
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.tokens.update({
      where: { refreshToken },
      data: {
        refreshToken: newRefreshToken,
        expiresAt: newExpiresAt,
      },
    });

    return { uid: decoded.uid, newRefreshToken }; // return uid and newRefreshToken
  } catch (error) {
    return null;
  }
};

module.exports = { generateAccessToken, generateRefreshToken, verifyRefreshToken, upsertToken };