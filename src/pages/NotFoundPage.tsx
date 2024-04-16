import { useNavigate } from 'react-router-dom'
import { Button, Stack, Text } from '@chakra-ui/react'
import { Heading } from '../shared/config/chakraTheme/ui'

const Error404 = () => {
    const navigate = useNavigate()
    return(
        <Stack gap="10px" align="center" my="auto" px="10px">
            <Heading as="h1" fontWeight={600} size="xl">
                Ошибка 404
            </Heading>
            <Text align="center" fontSize="20px">
                Страница которую вы пытаетесь открыть не существует
            </Text>
            <Button onClick={() => navigate('/')}>Главная страница</Button>
        </Stack>
    )
}

export default Error404