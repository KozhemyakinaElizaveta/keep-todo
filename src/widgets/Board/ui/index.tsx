import { Flex } from 'shared/ui'
import { useEffect, useRef, useState } from 'react'
import {
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  Box,
  Text,
  Checkbox,
  Stack,
  Badge,
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { Task } from 'entities/project/model/types'
import { selectCurrentList } from 'entities/project/model/selectors'
import { toggleTaskCompletion, deleteTask } from 'entities/project/model/slice'
import { Delete } from 'shared/iconpack'
import { Settings } from 'shared/iconpack/Settings'

export const Board = () => {
  const dispatch = useDispatch()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const currentList = useSelector(selectCurrentList)
  const [tasks, setTasks] = useState<{
    all: Task[]
    active: Task[]
    completed: Task[]
  }>({
    all: [],
    active: [],
    completed: [],
  })
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    if (currentList) {
      const allTasks = currentList.tasks || []
      const activeTasks = allTasks.filter((task) => !task.completed)
      const completedTasks = allTasks.filter((task) => task.completed)

      setTasks({
        all: allTasks,
        active: activeTasks,
        completed: completedTasks,
      })
    }
  }, [currentList])

  const handleToggleTask = (taskId: string) => {
    dispatch(
      toggleTaskCompletion({
        listId: currentList?.id || 0,
        taskId,
      })
    )
  }

  const handleDeleteClick = (taskId: string) => {
    setTaskToDelete(taskId)
    onOpen()
  }

  const confirmDelete = () => {
    if (taskToDelete && currentList) {
      dispatch(
        deleteTask({
          listId: currentList.id,
          taskId: taskToDelete,
        })
      )
    }
    setTaskToDelete(null)
    onClose()
  }

  const renderTask = (task: Task) => (
    <Box
      key={task.id}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      borderColor={'mallow.300'}
      mb={2}
      bg="white"
    >
      <Flex align="center" justify="space-between">
        <Checkbox
          isChecked={task.completed}
          onChange={() => handleToggleTask(task.id)}
          mr={4}
          _hover={{ borderColor: 'mallow.300' }}
        />
        <Stack flex={1}>
          <Text
            fontSize="md"
            textDecoration={task.completed ? 'line-through' : 'none'}
          >
            {task.title}
          </Text>
          {task.description && (
            <Text fontSize="sm" color="gray.600">
              {task.description}
            </Text>
          )}
        </Stack>
        <Flex align="center" ml={2}>
          {task.priority && (
            <Badge
              colorScheme={
                task.priority === 'high'
                  ? 'red'
                  : task.priority === 'medium'
                    ? 'orange'
                    : 'green'
              }
              mr={2}
            >
              {task.priority}
            </Badge>
          )}
          <IconButton
            aria-label="Delete task"
            icon={<Delete />}
            bg={'red.400'}
            _hover={{ bg: 'red.500' }}
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleDeleteClick(task.id)
            }}
          />
        </Flex>
      </Flex>
    </Box>
  )

  return (
    <Box w={'100%'} h={'100%'} py={'25px'} position="relative">
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Удалить задачу
            </AlertDialogHeader>

            <AlertDialogBody>
              Вы уверены, что хотите удалить эту задачу? Это действие нельзя
              отменить.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>Отмена</Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Удалить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Menu>
        <MenuButton
          as={IconButton}
          icon={<Settings />}
          aria-label="Settings"
          colorScheme="transparent"
          position="absolute"
          top="4"
          right="2"
        />
        <MenuList p={4}>
          <List spacing={2}>
            <ListItem>Все задачи ({tasks.all.length})</ListItem>
            <ListItem>Активные ({tasks.active.length})</ListItem>
            <ListItem>Завершенные ({tasks.completed.length})</ListItem>
          </List>
        </MenuList>
      </Menu>

      <Flex gap={4} flexDir={'column'} p={'20px'}>
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Активные задачи
          </Text>
          {tasks.active.length > 0 ? (
            tasks.active.map(renderTask)
          ) : (
            <Text color="gray.500">Нет активных задач</Text>
          )}
        </Box>

        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Завершенные задачи
          </Text>
          {tasks.completed.length > 0 ? (
            tasks.completed.map(renderTask)
          ) : (
            <Text color="gray.500">Нет завершенных задач</Text>
          )}
        </Box>
      </Flex>
    </Box>
  )
}
