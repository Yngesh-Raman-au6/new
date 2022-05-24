import dbConnect from '../../../../utils/dbConnect';
import { signJWT, verifyJWT } from '../../../../utils/jwt';
import userSchema from '../../../../utils/models/userSchema'
import { setCookies } from 'cookies-next';
import buildId from 'build-id'

dbConnect();

async function handler(req, res) {
    const { email, password } = req.body

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    // checks if email already exists 
    const userExist = await userSchema.findOne({ email: email });

    if (userExist == null) {

        const refreshId = buildId(70);
        var name = email.split("@")[0];
        const userName = name.slice(0, 10);

        // create user in db
        const userData = await userSchema.create({
            _id: buildId(10),
            username: userName,
            email: email,
            password: password,
            created: new Date(),
            refreshId: refreshId,
        });


        // create tokens
        const payload = { id: userData._id, refreshId: refreshId }
        const refreshToken = signJWT(payload, `${process.env.USER_SESSION_TIME}s`);


        // set access token in storage
        setCookies('refreshToken', refreshToken, { req, res, maxAge: process.env.USER_SESSION_TIME });

        // send user back
        return res.status(200).json({
            success: true,
            authorization: true,
            user: { username: userData.username, id: userData._id }
        });

    }
    else {
        return res.status(200).json({ success: false, response: 'Email already exist' })
    }


}

export default handler;