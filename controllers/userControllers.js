import User from "../models/user.js"; // Import the User model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;  // Define the number of salt rounds for bcrypt

export function getUsers(req, res) {
    User.find().then(
        (userList) => {
            res.json({
                list: userList
            });
        }
    ).catch((err) => {
        res.status(500).json({
            message: "Error fetching users",
            error: err
        });
    });
}

export function postUser(req, res) {
    const { email, password, name } = req.body;

    // Hash the password before saving the user
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({
                message: "Error hashing password",
                error: err
            });
        }

        const newUser = new User({
            email,
            password: hashedPassword,
            name
        });

        newUser.save()
            .then(() => {
                res.json({
                    message: "User created successfully",
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: "User creation failed",
                    error: err
                });
            });
    });
}

export function deleteUsers(req, res) {
    const { email } = req.body;

    User.deleteOne({ email })
        .then(() => {
            res.json({
                message: "User deleted successfully"
            });
        })
        .catch(() => {
            res.status(500).json({
                message: "User deletion failed"
            });
        });
}

export function putUsers(req, res) {
    res.json({
        message: "This is a PUT request",
    });
}

export function loginUser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Compare the hashed password with the entered password
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error comparing passwords",
                    error: err
                });
            }

            if (!result) {
                return res.status(401).json({
                    message: "Invalid credentials",
                });
            }

            // Only passing the user ID or any unique field as the payload
            const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });

            res.json({
                message: "User found",
                user,
                token, // Returning the token
            });
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Error logging in",
            error: err
        });
    });
}
