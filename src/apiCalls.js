import axios from 'axios';


export const loginCall = async(userCredential, dispatch) => {
    dispatch({type:'LOGIN_START'})
    try {
        const res=await axios.post('auth/login', userCredential)
        localStorage.setItem('jwt',JSON.stringify(res.data.token))
        localStorage.setItem('userDetails',JSON.stringify(res.data.user))
        dispatch({type:'LOGIN_SUCCESS', payload:res.data.user})
    } catch (error) {
        dispatch({type:'LOGIN_FAILURE', payload:error})
    }
}