import dbConnect from '../../../../utils/dbConnect';
import userSchema from '../../../../utils/models/userSchema'
import { signJWT, verifyJWT } from '../../../../utils/jwt';
import { setCookies, removeCookies } from 'cookies-next';

dbConnect();

async function handler(req, res) {

    removeCookies('refreshToken', { req, res});

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    try {
        // get user
        const data = await verifyJWT(req.body.token);

        const userData = await userSchema.findOne({
            _id: data.payload.id
        });

        userData.confirmed = true;
        await userData.save();

        return res.json({ success: true, user: userData, authorization: true });
    }
    catch (err) {
        return res.json({ success: false, message: "Cannot verify your identity", authorization: false });
    }

    return res.json({ success: false, message: "Cannot verify your identity", authorization: false });

}

export default handler;