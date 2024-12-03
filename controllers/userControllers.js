import User from "../models/user.js"; // Import the User model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export function getUsers(req, res) {
    User.find().then(
        (userList) => {
            res.json({
                list: userList
            });
        }
    );
}

export function postUser(req, res) {
    const user = req.body;

    const password = req.body.password;

    // Hash the password before saving it to the database
    const passwordHash = bcrypt.hashSync(password, 10);
    console.log(passwordHash); // Logs hashed password

    user.password = passwordHash;

    const newUser = new User(user);
    newUser
        .save()
        .then(() => {
            res.json({
                message: "User created successfully",
            });
        })
        .catch((error) => {
            console.error('Error during user creation:', error);  // Log the error to console
            res.json({
                message: "User creation failed",
                error: error.message,  // Provide error details in response
            });
        });
}

export function deleteUsers(req, res) {
    const email = req.body.email;
    User.deleteOne({ email: email }).then(() => {
        res.json({
            message: "User Delete Successful"
        });
    }).catch(() => {
        res.json({
            message: "User Deletion Failed"
        });
    });
}

export function putUsers(req, res) {
    res.json({
        message: "This is a PUT request",
    });
}

export function loginUser(req, res) {
    const credentials = req.body;

    User.findOne({ email: credentials.email }).then(
        (user) => {
            if (user == null) {
                return res.status(404).json({
                    message: "User not found",
                });
            } else {
                // Compare the plain text password with the hashed password in the database
                const passwordMatch = bcrypt.compareSync(credentials.password, user.password);

                if (!passwordMatch) {
                    return res.status(400).json({
                        message: "Incorrect password",
                    });
                }

                // Only passing the user ID or any unique field as the payload
                const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });
                res.json({
                    message: "User found",
                    user: user,
                    token: token, // Returning the token
                });
            }
        }
    ).catch(err => {
        res.status(500).json({
            message: "Server error",
            error: err,
        });
    });
}
