import dbConnect from "../../../utils/dbConnect";
import userSchema from '../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    const { subid, payout } = req.query;

    // get user data
    const userData = await userSchema.findOne({
        _id: subid
    });

    if (!userData) {
        return res.json({ success: false, message: 'Something went wrong' });
    };

    // update the coin value
    const prevCoins = parseInt(userData.coins)
    userData.coins = prevCoins + parseInt(payout);
    await userData.save();

    return res.status(200).json({ success: true })
}
