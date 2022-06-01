const bcrypt = require('bcrypt');
const Crypto = require('crypto')
const User = require('../db/schemas/user')
const Token = require('../db/schemas/token')
const jwt = require('jsonwebtoken')

const registerUser = (req,res) => {
    const { email, name, password } = req.body;

    User.findOne({email:email}, async (err,doc) => {
        if (err) return res.send(err)
        if (doc) return res.send('User Already Exists')
  
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({email: email, name: name, password: hashedPassword})
        return newUser ? res.send(`User Created Successfully!`) : res.send('Failed to create user')
    })
}

const login = async (req,res) => {
    // same as register
    const { email, password } = req.body;
    let user = await User.findOne({email: email})
    if (!user) return res.status(401).send('Invalid Email or Password.')

    let validatePassword = await bcrypt.compare(password, user.password)
    if (!validatePassword) return res.status(401).send('Invalid Email or Password.')

    const accessToken = generateAccessToken(user._id);
    const refreshToken = jwt.sign({ user: user._id}, process.env.REFRESH_TOKEN )
    await Token.create({ refreshToken: refreshToken })

    res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, uid: user._id})
}

const logout = (req,res) => {
    const { refreshToken } = req.body;
    // find token in database and remove
    Token.findOneAndRemove({refreshToken: refreshToken}, async (err,doc) => {
        return err ? res.status(401).send() : res.status(204).send('User Logout Successful') 
    })
}

const validateSession = (req,res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.status(401).send('No Auth Token')

    jwt.verify(token, process.env.GUARDIAN_TOKEN, (err,user) => {
        if (err) return res.status(403).send('Invalid Token')
        res.status(200).send('User Auth Token Verified.')
    })
}

const generateAccessToken = (user) => {
    return jwt.sign({user: user}, process.env.GUARDIAN_TOKEN, { expiresIn: '20m' } )
}

module.exports = { registerUser, login, logout, validateSession }