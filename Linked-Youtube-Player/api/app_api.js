var rooms_from_api = require('../lib/socket_server');

exports.init = (app) => {

	app.get("/api/v1/rooms", async (req, res) => {
		const rooms = await rooms_from_api.rooms;
		res.json(rooms);
	});
}

