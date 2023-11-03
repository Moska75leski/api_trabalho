require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET;


module.exports = app => {

    app.post('/login', (req, res, next) => {
        if (req.body.nome === 'everton' && req.body.senha === '123'){
            const id = 1;
            const token = jwt.sign({ id }, secretKey, { expiresIn: 3000 });
            return res.json({ auth: true, token});
        }

        res.status(500).json({message: 'Login inválido'});
    })
}