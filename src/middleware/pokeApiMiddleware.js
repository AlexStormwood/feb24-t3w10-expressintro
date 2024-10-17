/*
1. Retrieve or generate a valid number for Pokemon ID eg. 25, should be from 1-1025
2. getPokeApiData -- actually making a request to the PokeAPI with a number from request.customData
3. trimPokeApiResponse -- process PokeAPI response data and keep just a few properties from that mess 
*/

const getOrCreatePokemonNumber = (request, response, next) => {
	let pokemonNumber = request.params.pokemonNumber || (Math.floor(Math.random() * 1025) + 1);
	console.log("We are gonna retrieve data for Pokemon with ID of " + pokemonNumber);

	// How to transfer pokemonNumber from this middleware to other middleware 
	request.pokemonStuff = {
		...request.pokemonStuff, // ... a.k.a the spread operator helps us keep existing object data 
		pokemonNumber
	}

	next();
}

async function getPokeApiData (request, response, next) {
	let pokemonID = request.pokemonStuff.pokemonNumber;
	console.log(pokemonID);

	let responseData = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonID);
	request.pokemonStuff = {
		...request.pokemonStuff, // ... a.k.a the spread operator helps us keep existing object data 
		responseData
	}

	// pokemonData = await responseData.json();
	next();
}

async function trimPokeApiData (request, response, next) {
	let validData = await request.pokemonStuff.responseData.json();

	let trimmedData = {
		name: validData.name,
		image: validData.sprites.front_default
	};


	response.json({
		result: trimmedData
	});

	// request.pokemonStuff = {
	// 	...request.pokemonStuff,
	// 	trimmedData
	// }
	// next();

}

module.exports = {
	getOrCreatePokemonNumber,
	getPokeApiData,
	trimPokeApiData
}