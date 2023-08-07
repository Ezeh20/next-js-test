import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import User from "@/models/userModel";
import connect from "@/utils/dbConfig";

connect();

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { username, password, email } = body;
  console.log(body);
  

  const user = await User.findOne({ email });

  if (user) {
    return NextResponse.json({ error: "User already exists" }, { status: 401 });
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  //create the user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return NextResponse.json({message:"Account created successfully"}, {status: 201})
    
  } catch (error:any) {
    return NextResponse.json({error: error.message}, {status:500})
  }
};
