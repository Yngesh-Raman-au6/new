import { getCookie} from 'cookies-next';

const authorize = async (req, res) => {

    // get domain 
    var url = process.env.NEXT_PUBLIC_DOMAIN_URL;

    async function sendReq(token, url) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        return response.json();
    }

    // get token from storage
    const refreshToken = getCookie('refreshToken', { req, res });

    // send conditional request
    if (!refreshToken) {
        return { data: { authorization: false } };
    }

    else {
        const data = await sendReq(refreshToken, url + '/api/user/auth');
        return { data: data };
    };

}

export default authorize;