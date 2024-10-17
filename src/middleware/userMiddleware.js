
const checkIfAdmin = (request, response, next) => {
	if (request.body.isAdmin == "true"){
		request.auth = {
			isAdmin: true
		};
		request.isAdmin = true;
		next();
	} else {
		response.json({
			error:"Not authorized for this endpoint!"
		})
	}
	
}

module.exports = {
	checkIfAdmin
}