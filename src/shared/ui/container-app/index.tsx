import { Flex } from 'shared/ui'
import { ReactNode } from 'react'

export const ContainerApp = ({ children }: { children: ReactNode }) => (
  <Flex
    w="100%"
    bg="white"
    direction="column"
    justify="center"
    borderRadius="20px 0px 20px 20px"
    mb="30px"
    mr="30px"
  >
    {children}
  </Flex>
)
