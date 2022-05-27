import dbConnect from '../../../utils/dbConnect';
import userSchema from '../../../utils/models/userSchema'

dbConnect();

async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    // delete user form db
    const userData = await userSchema.findOne({ _id: req.body._id });

    userData.username = req.body.username;
    await userData.save();

    // send user back
    return res.status(200).json({
        success: true,
        authorization: false,
        user: userData
    });

}

export default handler;