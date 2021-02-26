const bcrypt = require("bcryptjs")

function hash(pass) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pass, salt)
    return hash
}

function compare(input_password, hash) {
    return bcrypt.compareSync(input_password, hash)
}

module.exports = {
    hash,
    compare,
}