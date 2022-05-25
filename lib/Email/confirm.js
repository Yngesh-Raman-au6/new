import { transporter } from './utils';
import { signJWT } from '../../utils/jwt'

export const sendConfirmEmail = async (email, id) => {

        // async email
        const payload = { id: id,email: email, timestamp: new Date() };

        const emailToken = signJWT(payload, '1d',)
        const url = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/${emailToken}`;

        console.log('Sending email to ' + email);

    try {
        transporter.sendMail({
            to: email,
            subject: 'Confirm Email',
            html: `<h5>Please click the button below to confirm your email:</h5> 
                    <center><a href="${url}"><button class="btn py-2 px-3"><h4>Confirm</h4></button></a></center>`,
        });
    }
    catch (err) {
        console.log(err);
    }
}