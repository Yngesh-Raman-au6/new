export default async function postRazorPay(path, payload) {
    var username = process.env.RAZORPAY_KEY;
    var password = process.env.RAZORPAY_SECRET;

    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${encodedToken}`);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: payload,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`https://api.razorpay.com/v1${path}`, requestOptions)
        return response.json();
    }
    catch (error) {
        return error
    };
};