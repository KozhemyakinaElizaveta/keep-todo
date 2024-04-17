import { useState } from "react";
import { Flex, Input, Button, FormControl, FormLabel, Text } from "@chakra-ui/react";
import { Contain } from "../widgets/Contain";
import { Heading } from "../shared/config/chakraTheme/ui";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        const usersString = localStorage.getItem("users");
        const users = usersString ? JSON.parse(usersString) : [];

        const user = users.find((u: any) => u.username === username && u.password === password);

        if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "/";
        } else {
        setError("Invalid username or password");
        }
    };

    return (
        <Contain>
            <Flex alignItems="center" justifyContent="center" flexDir="column">
                <Heading as="h1" fontWeight={600} size="xl" mb={6}>
                    Log in
                </Heading>
                <FormControl id="username" isRequired mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        width={'30rem'}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        width={'30rem'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                {error && (
                <Flex alignItems="center" justifyContent="center" color="red.500" mb={4}>
                    {error}
                </Flex>
                )}
                <Button colorScheme="blue" width={'10rem'} onClick={handleLogin}>
                Log in
                </Button>
                <Flex flexDirection={'column'} alignItems={'center'} mt={'2rem'}>
                    <Text color={'blue.500'}>Вы - новый пользователь?</Text>
                    <Link className="no_style" to='/register' >
                        <Text color="blue.600" _hover={{color: "blue.500"}} >Зарегистрироваться</Text>
                    </Link>
                </Flex>
            </Flex>
        </Contain>
    );
};

export default LoginPage;
