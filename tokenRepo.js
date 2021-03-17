const Token = require('./models/Token')

module.exports.saveToken = async (token) => {

    const tokenModel = new Token({
        token: token
    })

    try {
        return await tokenModel.save()
    } catch (error) {
        throw new Error('Error saving token')
    }
}

module.exports.findToken = async (token) => {

    try {
        const storedToken = await Token.findOne({ token: token })
        return storedToken && storedToken.token
    } catch (error) {
        throw new Error(`Error trying to find token ${token}`)
    }
}

module.exports.deleteToken = async (token) => {

    try {
        return await Token.deleteMany({ token: token })
    } catch (error) {
        throw new Error(`Error trying to delete token ${token}`)
    }
}