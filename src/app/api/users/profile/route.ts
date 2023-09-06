import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User-model";
import connect from "@/utils/dbConfig";
connect();

export const GET = async (request: NextRequest) => {
  try {
    //get the token from the cookies if it exists
    const token = request.cookies.get("token")?.value || "";
    //decode the token
    const encodedData: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    //use that id to look for the user in the database
    const user = await User.findOne({ _id: encodedData.id }).select(
      "-password"
    );
    
    if (!user) {
      return NextResponse.json({ error: "Session timedout" }, { status: 401 });
    }
    //return the user with other messages
    return NextResponse.json({
      message: "user found",
      data: user,
      success: true,
      tokenexp: encodedData.exp,
      token: token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
