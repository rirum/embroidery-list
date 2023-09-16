import axios from 'axios';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
// import userRepository from '../repositories/auth-repository';
import httpStatus from 'http-status';
// import userRepository from '@/repositories/user-repository';
// import authenticationService from '@/services/authentication-service';

export async function authGoogleSignIn(req: Request, res: Response) {
  const { idToken, accessToken } = req.body;
  console.log(idToken, accessToken);

  try {
    const client = new OAuth2Client(process.env.ACCESS_TOKEN);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.ACCESS_TOKEN,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );
    console.log(data);
    // if (
    //   !payload.email_verified ||
    //   data.email_verified !== payload.email_verified
    // ) {
    //   return res.status(httpStatus.BAD_REQUEST).send();
    // }

    // const response = await userRepository.findByEmailAndToken(payload.email);
    // if (response) return res.send({ token: response.Session[0].token });

    // const user = await userRepository.create({
    //   email: payload.email,
    //   password: payload.at_hash,
    // });

    // const token = await authenticationService.createSession(user.id);

    // res.send({ token });
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
}
