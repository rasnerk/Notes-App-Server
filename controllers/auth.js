const registerUser = (req,res) => {
    // -- Name: username, email: email, password: password -- //
    // get this stuff ^, then send it back to the user
}

const login = (req,res) => {
    // same as register
}

const logout = (req,res) => {
    // same as register
}

const validateSession = (req,res) => {
    // send a dummy token 
    // send it back to the user
}

const assignSessionToken = () => {

}

const terminateSessionToken = () => {
    
}

module.exports = { registerUser, login, logout, validateSession }