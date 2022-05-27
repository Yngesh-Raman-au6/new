import dbConnect from '../../../../../utils/dbConnect';
import userSchema from '../../../../../utils/models/userSchema'
import buildId from 'build-id';
import { signJWT } from '../../../../../utils/jwt';
import { setCookies } from 'cookies-next';

dbConnect();

async function handler(req, res) {
    const { email, photoUrl } = req.body

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    // checks if email already exists 
    const userExist = await userSchema.findOne({ email: email });

    if (userExist == null) {

        var name = email.split("@")[0];
        const nameString = await name.slice(0, 4) + buildId();
        const userName = nameString.slice(0, 7);


        // create user in db
        const userData = await userSchema.create({
            _id: buildId(10),
            username: userName,
            email: email,
            googleAuth: true,
            confirmed: true,
            photoUrl: photoUrl,
        });

        const refreshId = buildId(70);

        // create tokens
        const payload = { id: userData._id, refreshId: refreshId }
        const refreshToken = signJWT(payload, `${process.env.USER_SESSION_TIME}s`);

        // set latest Ids in db
        userData.refreshId = refreshId;
        await userData.save();

        // set access token in storage
        setCookies('refreshToken', refreshToken, { req, res, maxAge: process.env.USER_SESSION_TIME });

        // send user back
        return res.status(200).json({
            success: true,
            authorization: false,
            user: userData
        });

    }
    else {
        return res.status(200).json({ success: false, response: 'Email already exist' })
    }


}

export default handler;