import {client} from "../common/utils/axios";
import {UserDto} from "./dtos/UserDto";

export function signUp(userInfo: UserDto) {
    return client.post("/auth/signup", userInfo)
}

export function signIn(userInfo: UserDto) {
    return client.post("/auth/signin", userInfo)
}