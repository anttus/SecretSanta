let mongoose = require('mongoose');

let roomSchema = mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	users: {
		type: Array,
		required: true,
	},
	santaReceiverPairs: {
		type: Array,
		required: false,
	},
});

let Room = (module.exports = mongoose.model('room', roomSchema));

module.exports.get = function (callback, limit) {
	Room.find(callback).limit(limit);
};
