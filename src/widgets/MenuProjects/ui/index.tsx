import { Flex, Button, Input, Text } from 'shared/ui'
import { ButtonsProjects } from 'shared/ui/menu-buttons/projects'
import { getIcon } from '../../../shared/utils/getIcon'
import { useDispatch, useSelector } from 'react-redux'
import { Plus } from 'shared/iconpack'
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { Icon1 } from 'shared/utils/icons/icon1'
import { Icon3 } from 'shared/utils/icons/icon3'
import { Icon4 } from 'shared/utils/icons/icon4'
import { Icon5 } from 'shared/utils/icons/icon5'
import { useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { Icon2 } from 'shared/utils/icons/icon2'
import { addList, setCurrentList } from 'entities/project/model/slice'
import {
  selectAllLists,
  selectCurrentList,
} from 'entities/project/model/selectors'

export const MenuProjects = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const lists = useSelector(selectAllLists)
  const currentList = useSelector(selectCurrentList)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [listName, setListName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null)
  const isBoards = useMatch('/keep-todo/lists')
  const isIssues = useMatch('/keep-todo/todo')
  const isProfile = useMatch('/keep-todo/profile')
  const navigate = useNavigate()

  const handleIconClick = (iconIndex: number) => {
    setSelectedIcon(iconIndex)
  }

  const handleCreateList = () => {
    if (selectedIcon === null) {
      toast({
        title: 'Ошибка',
        description: 'Выберите иконку для списка',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    if (listName.trim()) {
      dispatch(
        addList({
          title: listName,
          icon: selectedIcon,
        })
      )
      toast({
        title: 'Успех',
        description: 'Список создан',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClose()
      setListName('')
      setSelectedIcon(null)
    } else {
      toast({
        title: 'Ошибка',
        description: 'Необходимо название списка',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Flex w="100%" ml="85px" gap="14px" mb="6px">
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Добавление списка</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" gap="15px">
                <Input
                  placeholder="Название списка"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                <Text fontSize="19px">Выберите иконку для списка:</Text>
                <Flex h="40px" w="100%" gap="10px">
                  {[Icon1, Icon2, Icon3, Icon4, Icon5].map((Icon, index) => (
                    <Flex
                      key={index}
                      justify="center"
                      align="center"
                      border={
                        selectedIcon === index
                          ? '2px solid #2452AD'
                          : '2px solid transparent'
                      }
                      borderRadius="50px"
                      cursor="pointer"
                      onClick={() => handleIconClick(index)}
                    >
                      <Icon width="35" height="35" />
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} onClick={onClose} variant="transparent">
                Отмена
              </Button>
              <Button onClick={handleCreateList}>Создать</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ButtonsProjects
          title={'Все списки'}
          check={!!isBoards}
          onClick={() => {
            navigate('/keep-todo/lists')
          }}
        />
        {lists.map((list) => (
          <ButtonsProjects
            key={list.id}
            title={list.title}
            Icon={getIcon(list.icon || null)}
            check={
              currentList?.id === list.id &&
              !isBoards &&
              !isIssues &&
              !isProfile
            }
            onClick={() => {
              dispatch(setCurrentList(list))
              navigate(`/keep-todo/list/${list.id}`)
            }}
          />
        ))}
        <IconButton
          onClick={onOpen}
          isRound={true}
          aria-label="Plus"
          icon={<Plus />}
          color={'black'}
          borderRadius="20px"
          background="white"
          _hover={{
            color: 'black',
            background: 'white',
            boxShadow: '0px 0px 3px 2px rgba(208, 224, 255, 1)',
          }}
        />
      </Flex>
    </>
  )
}
