// Process HTTP requests and define available options
Room = require('../model/room');

exports.newRoom = function (req, res) {
	let room = new Room();
	const crypto = require('crypto');
	let id = crypto.randomBytes(2).toString('hex').toUpperCase();
	room.code = id;
	room.users = req.body.users ? req.body.users : [];
	room.users = shuffleArray(room.users);
	for (let i = 0; i < room.users.length; i++) {
		if (i === room.users.length - 1) {
			room.santaReceiverPairs.push({
				santa: room.users[room.users.length - 1],
				receiver: room.users[0],
			});
		} else {
			room.santaReceiverPairs.push({
				santa: room.users[i],
				receiver: room.users[i + 1],
			});
		}
	}
	room.save(function (err) {
		if (err) {
			res.json(err);
		}
		res.json({
			message: 'New room created',
			data: room,
		});
	});
};

exports.getRoom = function (req, res) {
	Room.findOne({ code: req.params.room_code }, function (err, room) {
		if (err) {
			res.send(err);
		}
		res.json({
			message: 'The pairs are not shown here.',
			users: room.users,
			code: req.params.room_code,
		});
	});
};

exports.deleteRoom = function (req, res) {
	Room.deleteOne({ code: req.params.room_code }, function (err) {
		if (err) {
			res.send(err);
		}
		res.json({
			status: 'success',
			message: 'Room deleted',
		});
	});
};

exports.getSecretSanta = function (req, res) {
	Room.findOne({ code: req.params.room_code }, function (err, room) {
		let secretSanta = req.params.user_name;
		if (!room.users.includes(secretSanta) || err) {
			res.send(err);
		} else {
			let receiver = '';
			for (let i = 0; i < room.santaReceiverPairs.length; i++) {
				if (room.santaReceiverPairs[i].santa === secretSanta) {
					receiver = room.santaReceiverPairs[i].receiver;
					break;
				}
			}
			res.json({
				message: 'Gift receiver found!',
				receiver: receiver,
			});
		}
	});
};

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
