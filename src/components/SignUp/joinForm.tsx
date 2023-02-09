import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    CircularProgress,
    InputGroup,
    InputRightElement,
    Icon
} from '@chakra-ui/react';
import React, {useEffect, useRef, useState} from "react";
import ErrorMessage from "../../modules/ErrorMessage";
import {Default} from "../../Layout/Default";
import {emailRegex, passwordRegex} from "../../common/utils/regex";
import {useNavigate} from "react-router-dom";
import {signUp} from "../../apis/user-api";

export function JoinForm() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true)

        if (!emailRegex(emailRef.current!.value)) {
            setError('아이디는 이메일형식 이여야 합니다.')
            setIsLoading(false)
            return
        } else if (!passwordRegex(passwordRef.current!.value)) {
            setError('패스워드는 8자리이상 이여야 합니다.')
            setIsLoading(false)
            return
        }

        signUp({email: emailRef.current!.value, password: passwordRef.current!.value})
            .then(response => {
                setIsLoading(false)
                navigate("/signin")
            })
            .catch(e => {
                setIsLoading(false)
                setError(e.response.data.message)
            })
    }

    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN") !== null) {
            navigate("/todo")
        }
    }, [])

    return (
        <Default pageName={"SignUp Form"}>
            <Flex width="full" align="center" justifyContent="center">
                <Box
                    p={8}
                    maxWidth="500px"
                    borderWidth={1}
                    borderRadius={8}
                    boxShadow="lg"
                >
                    <Box textAlign="center">
                        <Heading>
                            Join
                        </Heading>
                    </Box>
                    <Box my={4} textAlign="left">
                        <form>
                            {error && <ErrorMessage message={error}/>}
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    data-testid="email-input"
                                    type="email"
                                    placeholder="test@test.com"
                                    size="lg"
                                    ref={emailRef}
                                />
                            </FormControl>
                            <FormControl isRequired mt={6}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        data-testid="password-input"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="*******"
                                        size="lg"
                                        ref={passwordRef}
                                    />
                                    <InputRightElement width="3rem">
                                        <Button
                                            h="1.5rem"
                                            size="sm"
                                            onClick={handlePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <Icon name="view-off"/>
                                            ) : (
                                                <Icon name="view"/>
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Button
                                data-testid="signup-button"
                                type="submit"
                                colorScheme="teal"
                                variant="outline"
                                width="full"
                                onClick={handleSubmit}
                                mt={4}
                            >
                                {isLoading ? (
                                    <CircularProgress
                                        isIndeterminate
                                        size="24px"
                                        color="teal"
                                    />
                                ) : (
                                    '회원가입'
                                )}
                            </Button>
                        </form>
                        <Button
                            colorScheme="teal"
                            variant="outline"
                            width="full"
                            onClick={() => {
                                navigate("/signin")
                            }}
                            mt={4}
                        >
                            로그인
                        </Button>
                    </Box>
                </Box>
            </Flex>
        </Default>
    )
}