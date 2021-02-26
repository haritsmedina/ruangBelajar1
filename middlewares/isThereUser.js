function isThereUser(req){
    return req.session?.User ? true : false
}

module.exports = {isThereUser}