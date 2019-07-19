const { TrackModel } = require('../modules/track/trackModel');

module.exports = function track(action, object) {
	return (req, res, next) => {
		const track = new TrackModel({ action, object });
		track.save();
		next();
	};
};
