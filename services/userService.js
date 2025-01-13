const User = require('../models/User');

const getUserById = async (userId) => {
	try {
		const user = await User.findById(userId).select('-password');
		return user;
	} catch (error) {
		throw new Error('Error fetching user: ' + error.message);
	}
};

module.exports = { getUserById };
