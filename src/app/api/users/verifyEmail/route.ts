import User from "@/models/User-model";
import connect from "@/utils/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { token } = body;

  try {
    //get the user by the verify tokenid and the token expiration should be grater than Date.now()
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};
