// controllers/settingsController.js
exports.getUserSettings = (req, res) => {
    // You can fetch user settings from the database or return dummy data
    const userId = req.userId; // Extract userId from the middleware or JWT

    // Example: Fetch settings from DB using userId
    // Assuming settings are stored in a 'users' collection or a 'settings' collection
    db.collection('users').findOne({ userid: userId }, (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching user settings' });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user.userpreferences);
    });
};

exports.updateUserSettings = (req, res) => {
    const userId = req.userId; 
    const newSettings = req.body; 

    db.collection('users').updateOne(
        { userid: userId },
        { $set: { userpreferences: newSettings } },
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating user settings' });
            }
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ message: 'Settings updated successfully' });
        }
    );
};
