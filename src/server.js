const express = require("express");
// Make an instance of the Express system
// so we can configure it 
// eg. routes, settings
const app = express();

// GET localhost:3000/ 
// .get("/", (req, res) => {})
// .get("/", (banana, elephant) => {})

/*
instance.verb(routePath,
	middleware 1,
	middleware 2,
	middleware 3,
	middleware 4,
	route handler
	)
*/

function xanderMiddleware (request, response, next){
	console.log("Xander middleware is now running!");
	request.coolCoderAcademyStuff = {
		...request.coolCoderAcademyStuff,
		xander: "cool programmer!"
	};
	// This doesn't work because request.coolCoderAcademyStuff wasn't defined yet 
	// request.coolCoderAcademyStuff.xander = "cool programmer!"
	next();
}

app.get("/", 
	// middleware function goes here
	xanderMiddleware,
	(request, response) => {
	// response.send("<h1>Hello world!</h1>");
	response.json({
		message:"Hello world!",
		customStuff: request.coolCoderAcademyStuff
	});
});

app.post("/", xanderMiddleware, (request, response) => {
	response.json({
		message: "POST request received!"
	});
});

// http://localhost:3000/bananas
app.post(
	"/bananas", 
	(request, response, next) => {
		console.log("Bananas route has run"); 
		next();
	}, 
	(request, response) => {
	response.json({
		message: "POST bananas received!"
	});
});

const PokemonController = require("./controllers/pokemonController.js");
// const {pokemonRouter} = require("blah blah")
// localhost:3000/pokemon/
app.use("/pokemon", PokemonController);

const UserController = require("./controllers/userController.js");
// domainName:port/users
app.use("/users", UserController);

module.exports = {
	app
}