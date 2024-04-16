import { chakra } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const Contain = ({ children }: { children: ReactNode }) => (
    <chakra.aside
        w={'100%'}
        h={'80%'}
        pt={'25px'}
        pb={'25px'}
        maxW={'35rem'}
        pos={'fixed'}
        display="flex"
        flexDir={'column'}
        alignItems={'center'}
        bgColor={'white'}
        borderRadius={'20px'}
        boxShadow={'0 4px 4px 0 rgba(0, 0, 0, 0.25)'}
        position={'absolute'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%, -50%)'}
    >
        {children}
    </chakra.aside>
)