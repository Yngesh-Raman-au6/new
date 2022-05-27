import dbConnect from '../../../../utils/dbConnect';
import userSchema from '../../../../utils/models/userSchema'
import buildId from 'build-id'

dbConnect();

async function handler(req, res) {
    const { email, password } = req.body

    if (req.method !== 'POST') {
        return res.status(500).json({ message: 'Soory this is post route' })
    }

    // checks if email already exists 
    const userExist = await userSchema.findOne({ email: email });

    if (userExist == null) {

        var name = email.split("@")[0];
        const nameString = await name.slice(0, 4) + buildId() ;
        const userName = nameString.slice(0, 7) ;


        // create user in db
        const userData = await userSchema.create({
            _id: buildId(10),
            username: userName,
            email: email,
            password: password,
        });

        // send user back
        return res.status(200).json({
            success: true,
            authorization: false,
            user: { email: userData.email, id: userData._id }
        });

    }
    else {
        return res.status(200).json({ success: false, response: 'Email already exist' })
    }


}

export default handler;