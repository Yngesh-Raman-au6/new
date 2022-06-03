import postRazorPay from "../../../utils/postRazorpay";
import dbConnect from "../../../utils/dbConnect";
import userSchema from '../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }
    console.log('setting bank account')
    var { name, contact_id, id, ifsc, account_number } = req.body;

    var raw = JSON.stringify({
        "contact_id": contact_id,
        "account_type": "bank_account",
        "bank_account": {
            "name": name,
            "ifsc": ifsc,
            "account_number": account_number
        }
    });

    // create new contact
    const response = await postRazorPay('/fund_accounts', raw)
    console.log(response['id']);

    try {
        const userData = await userSchema.findOne({
            _id: id
        });

        userData.bankAccountId = response['id'];
        await userData.save();

        return res.json({ success: true, user: userData, id: response['id'] });
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Something went wrong" });
    }

};
