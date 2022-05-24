import dbConnect from '../../../../utils/dbConnect';
import { removeCookies } from 'cookies-next';

dbConnect();

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    removeCookies('refreshToken', { req, res });
    return res.send({ success: true })

}