

async function getUsersFromDatabase (request, response, next){
	request.userData = [
		"Damian", "Marianne", "Kim", "Brad", "Hayden"
	];
	next();
}

module.exports = {
	getUsersFromDatabase
}