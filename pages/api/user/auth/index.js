import jwt from 'jsonwebtoken';
import dbConnect from '../../../../utils/dbConnect';
import userSchema from '../../../../utils/models/userSchema'

dbConnect();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    const unAuthorized = { success: true, authorization: false }
    const authHeader = req.headers.authorization;

    if (authHeader) {

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.json(unAuthorized)
        }

        const publicKey = Buffer.from(process.env.NEXT_PUBLIC_APP_PUBLIC_KEY, 'base64').toString('ascii');


        try {
            // for valid refresh token

            const decoded = jwt.verify(token, publicKey);

            const userData = await userSchema.findOne({ _id: decoded.id })

            if (userData.refreshId === decoded.refreshId) {
                // return data
                const payload = { success: true, authorization: true, user: userData }
                return res.json(payload);
            }
            else {
                return res.json(unAuthorized)
            }

        }
        catch (e) {
            return res.json(unAuthorized)
        }


        return res.json(unAuthorized)

    }

    else {
        return res.json(unAuthorized)
    }
}