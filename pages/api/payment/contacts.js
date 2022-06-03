import postRazorPay from "../../../utils/postRazorpay";
import dbConnect from "../../../utils/dbConnect";
import userSchema from '../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    var { name, phone, email, id } = req.body;

    var raw = JSON.stringify({
        "name": name,
        "email": email,
        "contact": phone,
        "type": "customer",
        "reference_id": id,
    });

    // create new contact
    const response = await postRazorPay('/contacts', raw)

    try {
        const userData = await userSchema.findOne({
            _id: id
        });

        userData.contactId = response.id;
        await userData.save();

        return res.json({ success: true, id: response.id });
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Something went wrong" });
    }

};
