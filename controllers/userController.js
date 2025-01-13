const { getUserById } = require('../services/userService');

const getUserPreference = async (req, res) => {
	try {
		const user = await getUserById(req.user.id);

		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}

		res.json({ preference: user.preference });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error.' });
	}
};

const updateUserPreference = async (req, res) => {
	const { preference } = req.body;

	if (!preference) {
		return res.status(400).json({ message: 'preference must be a string.' });
	}

	try {
		const user = await getUserById(req.user.id);

		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}

		user.preference = preference;
		await user.save();

		res.json({ message: 'Preference updated successfully.', preference: user.preference });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error.' });
	}
};

module.exports = { getUserPreference, updateUserPreference };
