import connect from "@/utils/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

const POST = async (request: NextRequest) => {
    await connect()
    const { username, email, password } = await request.json();

    //check if the user already exists
    const user = await User.findOne({ email })
    if (user) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    //hash the password
    const salt = await bcryptjs.genSalt(10)
    const encrypted = await bcryptjs.hash(password, salt)

    //populate the db with the user information
    const newUser = new User({
        username,
        email,
        password: encrypted
    })

    try {
        //save the user in the db
        await newUser.save()
        return NextResponse.json({ message: "Account created successfully"}, { status: 201 })

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
} 