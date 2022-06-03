import { signJWT } from '../../utils/jwt'
const sgMail = require('@sendgrid/mail')

export const sendConfirmEmail = async (email, id) => {

    // async email
    const payload = { id: id, email: email, timestamp: new Date() };

    const emailToken = signJWT(payload, '1d',)
    const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${emailToken}`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
        to: email, // Change to your recipient
        from: 'infosid86@gmail.com', // Change to your verified sender
        subject: 'Confirm Email',
        text: 'Please click the button below to confirm your email',
        html: `<h5>Please click the button below to confirm your email:</h5> 
                    <center><a href="${url}"><button className="btn btn-primary py-2 px-3"><h4>Confirm</h4></button></a></center>`,
    }

    await sgMail.send(msg);

}