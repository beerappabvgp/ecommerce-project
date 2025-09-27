import { users } from "../schema/userSchema.js";

export let registerUser = async (req, res) => {
    try {
        console.log("request information ...", req)
    // get all the information from the client
    let { name, email, age, password, gender, contactNumber, address } = req.body;

    // data validation
    if (!name || !email || !password) {
        let response = {
            "success": false,
            "message": "Name, email and password are required"
        }
        return res.status(400).json(response)
    }

    if (typeof name != "string" || typeof email != "string" || typeof password != "string" || typeof age != "number" || typeof gender != "string" || typeof contactNumber != "number" || typeof address != "string") {
        let response = {
            "success": false,
            "message": "Invalid datatype"
        }
        return res.status(400).json(response)
    }
    // validate the contact number for 10 digits
    if (contactNumber.toString().length != 10) {
        let response = {
            "success": false,
            "message": "Contact number should be 10 digits long"
        }
        return res.status(400).json(response)
    }

    // create a new user
    let user = await users.create({name,email, password, age, gender, contactNumber, address})
    console.log("User registered successfully .... ")
    let response = {
        "success": true,
        "message": "User registered successfully .... ",
        "data": user
    }
    return res.status(200).json(response)
    } catch (error) {
        console.log("User registration failed .... ", error)
        return res.status(500).json("User registration failed .... ")
    }
}

export let loginUser = async (req, res) => {
    try {
        // get the information from client
        let { email, password } = req.body;
        if (!email || !password) {
            let response = {
                "success": false,
                "message": "Email and password are required"
            }
            return res.status(400).json(response)
        }

        if (typeof email != "string" || typeof password != "string") {
            let response = {
                "success": false,
                "message": "Invalid datatype"
            }
            return res.status(400).json(response)
        }


        // get the user information from the database

        let user = await users.findOne({email})


        // check whether password is same or not

        if (user) {
            if (user.password == password) {
                let response = {
                    "success": true,
                    "message": "User logged in successfully .... ",
                    "data": user
                }
                return res.status(200).json(response)
            } else {
                let response = {
                    "success": false,
                    "message": "Invalid password or email"
                }
                return res.status(400).json(response)
            }
        } else {
            let response = {
                "success": false,
                "message": "User not found"
            }
            return res.status(404).json(response)
        }

    } catch (error) {
        console.log("User login failed .... ", error)
        return res.status(500).json("User login failed .... ")
    }
}
