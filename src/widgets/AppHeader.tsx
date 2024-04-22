import { Flex, Icon } from "@chakra-ui/react";
import { Text } from "../shared/config/chakraTheme/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket} from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { Link, useMatch } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";

export const activePaths = {
    'home': [{ path: '/', exact: true }],
    'login': [{ path: '/login', exact: false }],
    'table': [{ path: '/table', exact: false }],
}

export const AppHeader = () => {
    const isLogPage = !!useMatch("/login");
    const isTablePage = !!useMatch("/table");

    const currentUser = localStorage.getItem('currentUser');

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        window.location.href = "/login";
        //return <Navigate to="/login" replace />
    };

    return (
        <Flex justifyContent="space-between" bg="white" height="3rem" alignItems={'center'}>
            <Link to='/'>
                <Text ml="6rem" fontWeight={'800'} color="blue.500" fontSize={'25px'}>Keep TODO</Text>
            </Link>
            {!currentUser ? 
            <Link to='/login'>
                <Icon as={FontAwesomeIcon} icon={faRightToBracket} color={isLogPage ? "blue.800" : "blue.500"} mr="3rem" _hover={{color: "blue.800"}}/>
            </Link>
            : 
            <Flex gap={'2rem'} alignItems={'center'} mr="3rem">
                <Link to='/table'>
                    <Icon as={FontAwesomeIcon} icon={faTable} color={isTablePage ? "blue.800" : "blue.500"} _hover={{color: "blue.800"}}/>
                </Link>
                <Icon as={CloseIcon} color={"blue.500"} _hover={{color: "blue.800"}} onClick={handleLogout}/>
            </Flex>}
        </Flex>
    );
};
