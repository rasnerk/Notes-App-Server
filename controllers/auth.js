const bcrypt = require('bcrypt');
const Crypto = require('crypto')
const User = require('../db/schemas/user')

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
    if (!user) return res.send('Invalid Email or Password.')

    let validPass = await bcrypt.compare(password, user.password)
    if (!validPass) return res.send('Invalid Email or Password.')
    let authToken = generateAuthToken()
    console.log(authToken)
    User.findByIdAndUpdate(user._id, {authToken: authToken})
    res.send({name: user.name, uid: user._id, authToken: user.authToken})
}

const logout = (req,res) => {
    // find user by id and terminate authToken && redirect the user back to login page
}

const validateSession = (req,res) => {
    // send a dummy token 
    // send it back to the user
}

const generateAuthToken = () => {
    return Crypto.randomBytes(64).toString('hex')
}

const terminateSessionToken = () => {
    // find user by id and remove the users authToken
}

module.exports = { registerUser, login, logout, validateSession }