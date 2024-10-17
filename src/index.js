const {app} = require('./server.js');

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
	console.log(`Server listening on localhost:${PORT}`);
});