import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authentication } from "./config"
import axios from 'axios';

const handleLogin = async (res) => {
    const data = res._tokenResponse;
    const response = await axios.post('/api/user/auth/google/login', {email: data.email})
    return response.data;
};

const handleSignUp = async (res) => {
    const data = res._tokenResponse;
    const response = await axios.post('/api/user/auth/google/signup', { email: data.email, photoUrl: data.photoUrl })
    return response.data;
}

const signInWithGoogle = async () => {

    const provider = new GoogleAuthProvider();

    try {
        const data = await signInWithPopup(authentication, provider);
        const res = await handleLogin(data);
        return res;
    }
    catch (err){
        return { success: false, authorization: false, response: ""};
	}
};

const signUpWithGoogle = async () => {

    const provider = new GoogleAuthProvider();

    try {
        const data = await signInWithPopup(authentication, provider)
        const res = await handleSignUp(data);

        return res;
    }
    catch (err) {
        return { success: false, authorization: false, response: ""};
	}
};


export { signInWithGoogle, signUpWithGoogle };