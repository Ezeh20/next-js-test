import User from "@/models/User-model";
import { NextResponse } from "next/server";
import connect from "@/utils/dbConfig";
import { mailingService } from "@/helpers/mailer";
connect();

export const POST = async (request) => {
  const body = await request.json();
  const { email, emailType, userId } = body;

  try {
    await mailingService({ email, emailType, userId })
    return NextResponse.json({ message: "Email sent successfull", success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
