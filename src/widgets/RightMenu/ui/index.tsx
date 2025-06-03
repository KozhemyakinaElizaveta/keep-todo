import { useDisclosure } from '@chakra-ui/react'
import { useMatch } from 'react-router-dom'
import { Plus } from 'shared/iconpack'
import { Button, Flex } from 'shared/ui'
import { CreateTaskModal } from 'widgets/index'

export const RightMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isHome = useMatch('/keep-todo/list/:id')
  const isProfile = useMatch('/keep-todo/profile')
  const isIssues = useMatch('/keep-todo/todo')
  const isBoards = useMatch('/keep-todo/lists')

  return (
    <>
      <CreateTaskModal type="create" isOpen={isOpen} onClose={onClose} />
      <Flex
        bgColor={'white'}
        p={'16px 16px 2px 16px'}
        borderRadius={'20px 20px 0 0'}
        boxShadow={'0px 13px white'}
      >
        {(isHome || isIssues || isBoards) && (
          <Button
            h={'35px'}
            fontWeight={600}
            fontSize="14px"
            color={'white'}
            borderRadius="12px"
            background={'blue.500'}
            leftIcon={<Plus strokeColor={'white'} />}
            _hover={{
              bgColor: 'blue.300',
            }}
            onClick={onOpen}
          >
            ToDo
          </Button>
        )}
        {isProfile && (
          <Button borderRadius={'15px'} onClick={() => {}} fontSize={'14px'}>
            Изменить
          </Button>
        )}
      </Flex>
    </>
  )
}
