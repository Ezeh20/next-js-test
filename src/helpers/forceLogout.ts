'use server'

import { cookies } from "next/headers";

export const Kickout = async () => {
  return cookies().set("token", "");
};
