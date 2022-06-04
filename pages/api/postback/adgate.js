import dbConnect from "../../../utils/dbConnect";
import userSchema from '../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    };

    const { user_id, point_value } = req.query;

    // get user data
    const userData = await userSchema.findOne({
        _id: user_id
    });

    if (!userData) {
        return res.json({ success: false, message: 'Something went wrong' });
    };

    // update the coin value
    const prevCoins = parseInt(userData.coins)
    userData.coins = prevCoins + parseInt(point_value);
    await userData.save();

    res.status(200).json(req.query);
}
