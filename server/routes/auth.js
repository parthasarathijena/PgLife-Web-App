const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

require('../dbconn/conn')
const User = require('../models/userSchema')

router.post('/register', async (req, res) => {
    const { name, email, phone, password, college, gender } = req.body;

    if (!name || !email || !phone || !password || !college || !gender)
        return res.status(422).json({ message: 'Enter Full Credential' });

    try {
        const response = await User.findOne({ email: email } || { phone: phone });
        if (response)
            return res.status(422).json({ message: 'Email already present' })

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        const user = new User({ name, email, phone, password: hashed, college, gender })
        const userSave = await user.save();
        if (userSave)
            return res.status(200).json({ message: 'User Register' })
        else
            return res.status(422).json({ message: 'User Not Register' })
    } catch (err) {
        console.log(err);
    }
})




router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(422).json({ message: 'Enter Full Credential' });

    try {
        const response = await User.findOne({ email: email });
        if (response) {
            const check = await bcrypt.compare(password, response.password);
            if (check) {
                return res.status(200).json(response)
            }
            else {
                return res.status(422).json({ message: 'Inavalid Credential' })
            }
        } else {
            return res.status(422).json({ message: 'Invalid Credential' })
        }
    } catch (err) {
        console.log(err);
    }
})



module.exports = router;