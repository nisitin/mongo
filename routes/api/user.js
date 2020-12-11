const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check')

const User = require('../../models/User')

// @route  POST api/users
// @desc   Register user
// @access Public
router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check(
        'email',
        'Please include a valid email'
    ).isEmail(),
    check(
        'password',
        'Please enter a password with 6 or more characters'
    ).isLength(({ min: 6 }))
],
    async (req, res) => {
        const errors = validationResult(req)//こうすることにより、reqの中身がエラーの場合初期化する。
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, passsword } = req.body

        try {
            let user = await User.findOne({ email })

            if (user) {
                res.status(400).json({ errors: [{ msg: "User already exists" }] })
            }
            // Get users gravatar

            // Encrypt password

            // Return jsonwebtoken
            res.send('User route')

        } catch (err) {
            console.error(err)
            res.status(500).send("Serve error")
        }
    })

module.exports = router