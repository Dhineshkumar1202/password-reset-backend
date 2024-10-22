const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');


exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(`Forgot password requested for email: ${email}`);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

   
    const resetToken = crypto.randomBytes(20).toString('hex');
    console.log(`Generated reset token: ${resetToken}`);

    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();
    console.log('User saved with reset token');


    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    console.log(`Reset URL: ${resetUrl}`);


    const message = `
      You requested a password reset. Please make a PUT request to the following URL:
      ${resetUrl}
    `;

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      text: message,
    });

    console.log('Email sent');
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
};



exports.resetPassword = async (req, res) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password' });
  }
};
