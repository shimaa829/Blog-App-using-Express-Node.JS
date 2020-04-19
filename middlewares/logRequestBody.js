function logRequestBody(req ,res , next){
    console.log('request body', req.body)
    if(!req.body){
        return next('error happened')
    }

    next()
}

module.exports = logRequestBody