const router = require('express').Router();

router.get('/', function (req, res) {
	res.json({
		status: 'API works',
		message: 'Your Secret Santa Generator is working!',
	});
});

let controller = require('./controller/controller');

router.route('/room').post(controller.newRoom);

router.route('/room/:room_code').get(controller.getRoom);

router.route('/room/:room_code').delete(controller.deleteRoom);

router.route('/secretsanta/:room_code/:user_name').get(controller.getSecretSanta);

module.exports = router;
