import { useState } from "react";
import { Flex, Input, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { Contain } from "../widgets/Contain";
import { Heading } from "../shared/config/chakraTheme/ui";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        const usersString = localStorage.getItem("users");
        const users = usersString ? JSON.parse(usersString) : [];
    
        const existingUser = users.find((u: any) => u.username === username);
        if (existingUser) {
            setError("Username is already taken");
            return;
        }
    
        const newUser = { username, password, todos: [] }; 
    
        users.push(newUser);
    
        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "/login";
    };

    return (
        <Contain>
            <Flex alignItems="center" justifyContent="center" flexDir="column">
                <Heading as="h1" fontWeight={600} size="xl" mb={6}>
                    Registration
                </Heading>
                <FormControl id="username" isRequired mb={4}>
                    <FormLabel>Username</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter your username"
                        width={'30rem'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl id="password" isRequired mb={4}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        width={'30rem'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl id="confirmPassword" isRequired mb={4}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        placeholder="Confirm your password"
                        width={'30rem'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormControl>
                {error && (
                    <Flex alignItems="center" justifyContent="center" color="red.500" mb={4}>
                        {error}
                    </Flex>
                )}
                <Button colorScheme="blue" width={'10rem'} onClick={handleRegister}>
                    Sign in
                </Button>
            </Flex>
        </Contain>
    );
};

export default RegisterPage;
