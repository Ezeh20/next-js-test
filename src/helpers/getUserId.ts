import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getUserId = (request: NextRequest) => {
  try {
    //get the token from the cookies if it exists
    const token = request.cookies.get("token")?.value || "";
    //decode the token
    const encryptedData: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    //ruturn the injected data you can as well just get a specific key from the object
    //in this case we are taking only the id
    return encryptedData.id;
  } catch (error: any) {
    throw new Error(error);
  }
};
