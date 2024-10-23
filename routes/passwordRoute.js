const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const nodemailer = require('nodemailer'); 
const crypto = require('crypto');

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

 
    const token = crypto.randomBytes(32).toString('hex');


    user.resetPasswordToken = token; 
    await user.save();

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error in forgot-password route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, 
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      user.password = await bcrypt.hash(newPassword, 10); 
      user.resetPasswordToken = undefined; 
      user.resetPasswordExpires = undefined; 
      await user.save();
  
      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
