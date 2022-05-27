import dbConnect from '../../../../utils/dbConnect';
import userSchema from '../../../../utils/models/userSchema'
import { removeCookies } from 'cookies-next';

dbConnect();

async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    // delete user form db
    await userSchema.deleteOne({ _id: req.body._id });

    // remove token cookies
    removeCookies('refreshToken',{ req, res});

    // send user back
    return res.status(200).json({
            success: true,
            authorization: false
        });

}

export default handler;