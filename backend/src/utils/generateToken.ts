import jwt from "jsonwebtoken";

type tokenInfomation = {
  username: string;
  role: string;
};

export function generateTokens(user: tokenInfomation) {
  const { username, role } = user;
  const accessToken = jwt.sign(
    { username: username, role: role }, // payload
    process.env.ACCESS_TOKEN_SECRET as string, // กำหนด secret
    { expiresIn: "1d", algorithm: "HS256" } // อายุ เเละ algorithm ในการสร้าง jwt
  );
  const refreshToken = jwt.sign(
    { username: username, role: role }, // payload
    process.env.REFRESH_TOKEN_SECRET as string, // กำหนด secret
    { expiresIn: "1d", algorithm: "HS256" } // อายุ เเละ algorithm ในการสร้าง jwt
  );
  return { accessToken, refreshToken };
}
