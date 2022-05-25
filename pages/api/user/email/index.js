import { sendConfirmEmail } from '../../../../lib/Email/confirm';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    };

    const { email, id } = req.body;

    sendConfirmEmail(email, id);

    return res.json({success: true})

}