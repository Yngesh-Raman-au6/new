import postRazorPay from "../../../utils/postRazorpay";
import dbConnect from "../../../utils/dbConnect";
import userSchema from '../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    var { amount, id } = req.body;


    const userData = await userSchema.findOne({
        _id: id
    });

    if (!userData) {
        return res.json({ success: false, message: 'Something went wrong' });
    };

    var raw = JSON.stringify({
        "account_number": "2323230077504910",
        "fund_account_id": userData.fundId,
        "amount": parseFloat((parseFloat(((amount) * 77) * 100)).toFixed(2)),
        "currency": "INR",
        "mode": "UPI",
        "purpose": "payout",
        "queue_if_low_balance": true,
        "reference_id": id,
        "narration": "LuckyOffer fund UPI Transfer",
    });

    // create new contact
    const response = await postRazorPay('/payouts', raw)

    if (response.id !== undefined) {

        userData.coins = userData.coins - (amount * 1000);
        await userData.save();

        return res.json({ success: true, user: userData, id: response.id, message: 'Transsaction Successfull. The amount will reflect on your UPI address within 24 hours.' });
    }
    else {
        return res.json({ success: false, message: 'Cannot process this transaction' });
    }

}