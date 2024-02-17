import jwt from "jsonwebtoken";

interface user {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export default function generateToken(res: user): string {
  let token: string = "";
  if (process.env.JWT_SECRET) {
    token = jwt.sign(
      {
        email: res.email,
        password: res.password,
        firstName: res.firstName,
        lastName: res.lastName,
      },
      process.env.JWT_SECRET.toString()
    );
  }
  return token;
}
