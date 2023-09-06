/**
 * This helper function verifies the users email or handles change password
 * It uses bcrypt to generate a token then updateds the fields in the database (verifyToken, forgotPasswordToken)
 * including the token expiry date
 */
import User from "@/models/User-model";
import connect from "@/utils/dbConfig";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
connect();

export const mailingService = async ({
  email,
  emailType,
  userId,
}) => {

  function generate(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  }
  generate(1000000, 9000000)
  try {
    //generate the verify token
    const verifyToken = generate(1000000, 9000000);
    //search and update the required user's fields
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: verifyToken,
        //the token will be invalid after 1hr
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: verifyToken,
        //the token will be invalid after 1hr
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    const mailOptions = {
      from: "chijioke1ezeh@gmail.com",
      to: `${email}`,
      subject: `${emailType === "VERIFY" ? "Verify your email" : "Reset your password"
        }`,
      text: `${emailType === "VERIFY" ? "You are getting this email because you need to verify your email to gain full access to the system. Please do so"
        : emailType === "RESET" ? "Reset your password" : ""}`,
      html: `<div style="display:flex, flex-direction:column, gap:1rem">
      <p>Click 
      <a style="text-decoration:none, list-style:none, color:#fff" href="${process.env.DOMAIN}/verify?token=${verifyToken}&email=${email}">
          <button style="color:#000, padding:1rem, border-radius:10px">Here</button>
      </a>
      to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
      </p>
      </br>
      <p>Or copy this ${verifyToken}</p>
      </div>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};