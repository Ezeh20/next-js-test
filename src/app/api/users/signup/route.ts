import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcrypt";
import User from "@/models/User-model"
import connect from "@/utils/dbConfig";

export const POST = async (request: NextRequest) => {
  const reqbody = await request.json();
  const { username, password, email } = reqbody;

  await connect();
  //check if the user already exists
  const user = await User.findOne({ email });

  if (user) {
    return NextResponse.json({ error: "user already exists" }, { status: 401 });
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
    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
