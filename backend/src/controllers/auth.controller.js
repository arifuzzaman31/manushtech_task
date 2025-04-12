const authService = require('../services/authService');
const { generateAccessToken, generateRefreshToken,verifyRefreshToken,upsertToken  } = require('../utils/jwt');

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.validateUser(email, password);
    // return res.status(200).json(req.body);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const accessToken = generateAccessToken(user.uid);
    const refreshToken = generateRefreshToken(user.uid);
    // Store refresh token in the database
    await upsertToken(user.id, refreshToken);

    return res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        uid: user.uid,
        name: user.name,
        email: user.email,
        role: user.roleInfo.role,
      },
    });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const signUp = async (req, res) => {
  try {
    const { name, email, password,phone, role } = req.body;
    const existingUser = await authService.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = await authService.createUser(name, email, password, phone, role);
    const accessToken = generateAccessToken(newUser.uid);
    const refreshToken = generateRefreshToken(newUser.uid);
    await upsertToken(newUser.id, refreshToken);
    return res.status(201).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: {
        uid: newUser.uid, // Use uid instead of _id
        name: newUser.name,
        email: newUser.email,
        role: newUser.role, // Include role information
      },
    });
    
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json(error.message); // Send error message
  }
}
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const userId = await verifyRefreshToken(refreshToken);

    if (!userId) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
    const accessToken = generateAccessToken(userId);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const signOut = async (req, res) => {
  try {
    res.status(200).json({ message: 'Successfully signed out' });
  } catch (error) {
    console.error('Sign-out error:', error);
    res.status(500).json({ message: 'Server error', error: error.message }); // Send error message
  }
};
const getUser = async (req, res) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    const result = await authService.getAllUsers(parseInt(page), parseInt(limit));
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const stats = await authService.getDashboardStats();
    return res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};
  
module.exports = {
  signIn,signOut,signUp,refreshAccessToken,getUser,getDashboardStats
};