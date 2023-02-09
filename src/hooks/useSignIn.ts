import {UserDto} from "../apis/dtos/UserDto";
import {useEffect, useState} from "react";
import {signIn} from "../apis/user-api";

export const useSignIn = (userInfo: UserDto) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(true);
    useEffect(() => {
        const logIn = async () => {
            signIn(userInfo)
                .then(response => {
                    localStorage.setItem("ACCESS_TOKEN", response.data)
                    setSuccess(true)
                })
                .catch(e => {
                    setError(e)
                })
        };
        logIn()

    }, [])

    return {success, error}
}