import postRazorPay from "../../../utils/postRazorpay";
import dbConnect from "../../../utils/dbConnect";
import userSchema from '../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    var { contact_id, id, address } = req.body;

    var raw = JSON.stringify({
        "account_type": "vpa",
        "contact_id": contact_id,
        "vpa": {
            "address": address
        }
    });

    // create new contact
    const response = await postRazorPay('/fund_accounts', raw)
    if (response['id'] === undefined) return res.json({ success: false, message: "Something went wrong" });

    try {
        const userData = await userSchema.findOne({
            _id: id
        });

        userData.fundId = response['id'];
        userData.UpiAddress = address;
        await userData.save();

        return res.json({ success: true, user: userData, id: response['id'] });
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Something went wrong" });
    }

};
