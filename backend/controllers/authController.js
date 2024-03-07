require('dotenv').config();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const db = require('../db')

const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username ||  !password || !email || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const checkUser = 'SELECT * FROM users WHERE username = $1';
    const checkResult = await db.query(checkUser, [username]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const insertUser ='INSERT INTO users (username, email, password, active) VALUES ($1, $2, $3, true) RETURNING *';
    const insertResult = await db.query(insertUser, [username, email, hashedPassword]);
    const newUser = insertResult.rows[0];
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: newUser.username,
          email: newUser.email
        },
        
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { username: newUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {

        const user = 'SELECT * FROM users WHERE username = $1';
        const result = await db.query( user, [username]);
        const foundUser = result.rows[0];
        if (!foundUser || !foundUser.active) {
          return res.status(401).json({ message: 'Unauthorized' });
        }
    
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json({ message: 'Unauthorized' });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          email: foundUser.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

     const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
      );

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.json({ accessToken });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        try {

          const user = 'SELECT * FROM users WHERE username = $1';
          const result = await db.query( user, [decoded.username]);
          const foundUser = result.rows[0];
          if (!foundUser) return res.status(401).json({ message: 'Unauthorized' });
          const accessToken = jwt.sign(
            {
              UserInfo: {
                username: foundUser.username,
                email: foundUser.email,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
          );
  
          res.json({ accessToken });
        } catch (error) {
          console.error('Error during refresh:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      }
    );
  };


const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: 'Cookie cleared' });
  };


module.exports = {
    register,
    login,
    refresh,
    logout,
}