import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export function LogoutButton() {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/")
    }

    return (
        <Button size="sm" onClick={handleLogout} colorScheme="red">
            Logout
        </Button>
    );
}