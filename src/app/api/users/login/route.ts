import User from "@/models/User-model";
import connect from "@/utils/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { email, password } = body;
  await connect();

  try {
    //check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Wrong username or password" },
        { status: 400 }
      );
    }

    //check if the user's password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Wrong username or password" },
        { status: 400 }
      );
    }

    //extract the user data you need to send to the client
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create a token for the client
    const token = jwt.sign(userData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    //response
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
