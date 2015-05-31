var ErrorCodes = {
	"401": {"error": "Invalid Auth Key"},
	"500": {"error":"Something went wrong. Please try again later."}
}

exports.handleAuthFailure = function(res){
	return res.status(401).send(ErrorCodes[401]);
}

exports.handleError = function(res, err){
	console.log('the error is: ', err)
	return res.status(500).send(ErrorCodes[500]);
}


