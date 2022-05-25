import { sendConfirmEmail } from '../../../../lib/Email/confirm';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    };

    const { email, id } = req.body;

    try {
        await sendConfirmEmail(email, id);
    }
    catch (err){
        console.log(err);
    }
    return res.json({success: true})

}