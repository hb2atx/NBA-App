import bcrypt from 'bcrypt';
const db = require('../db')

const getAllUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT id, username, email FROM users');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const createNewUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      
        const duplicate = await db.query('SELECT * FROM users WHERE username = $1', [ username ]);
        if (duplicate.rows.length > 0) {
            return res.status(409).json({ message: 'Duplicate username' });
        }
        const hashedPwd = await bcrypt.hash(password, 12);
        const insertResult = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPwd]);
        const newUser = insertResult.rows[0];
        res.status(201).json({ message: `New user ${newUser.username} created`, user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
        const { id, username, email, password } = req.body;
        try {
            const user = await db.query('SELECT * FROM users WHERE id = $1', [ id ]);
            if (user.rows.length === 0) {
                return res.status(400).json({ message: 'User not found' });
            }
            const duplicate = await db.get('SELECT * FROM users WHERE (username = $1 OR email = $2) AND id <> $3', [ username, email, id ]);
            if (duplicate.rows.length > 0) {
                return res.status(409).json({ message: 'Duplicate username or email' });
            }
            const hashedPwd = password ? await bcrypt.hash(password, 12) : user.rows[0].password;
            await db.post('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4', [username, email, hashedPwd, id]);
            res.json({ message: `${username} updated` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

const deleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await db.query('SELECT * FROM users WHERE id = $1', [ id ]);
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }
        await db.post('DELETE FROM users WHERE id = $1', [id]);
        res.json({ message: `User with ID ${id} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}







// git branch -M main
// hb2atx@DESKTOP-HQE1TR9:~/myapps/backend$ git remote add origin git@github.com:hb2atx/myapps.git
// hb2atx@DESKTOP-HQE1TR9:~/myapps/backend$ git push -u origin main