import User from "@/models/User-model";
import connect from "@/utils/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcrypt";
import jwt from "jsonwebtoken"

export const POST = async (request: NextRequest) => {
  await connect();
  const body = await request.json();
  const { email, password } = body;

  try {
    //check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Wrong email or password" }, {status:400});
    }
    //check the password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if(!isPasswordValid){
        return NextResponse.json({error: "Wrong email or password" }, {status:400})
    }

    //create a tokenData to be sent to the client
    const tokenData ={
        id:user._id,
        username:user.username,
        email:user.email,
    }


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
