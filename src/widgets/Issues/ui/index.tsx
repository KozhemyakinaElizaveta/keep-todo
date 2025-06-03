import { Badge, Checkbox, useDisclosure } from '@chakra-ui/react'
import {
  selectAllLists,
  selectCurrentList,
} from 'entities/project/model/selectors'
import {
  setCurrentTask,
  toggleTaskCompletion,
} from 'entities/project/model/slice'
import { Task } from 'entities/project/model/types'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Text } from 'shared/ui'
import { CreateTaskModal } from 'widgets/index'

export const Issues = () => {
  const lists = useSelector(selectAllLists)
  const currentList = useSelector(selectCurrentList)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const allTasks = lists.flatMap(
    (list) => list.tasks?.map((task) => ({ ...task, listId: list.id })) || []
  )

  const handleTaskClick = (task: Task) => {
    dispatch(setCurrentTask(task))
    onOpen()
  }

  const handleCheckboxChange = (task: Task) => {
    if (task.listId) {
      dispatch(
        toggleTaskCompletion({
          listId: task.listId,
          taskId: task.id,
        })
      )
    }
  }

  return (
    <>
      <CreateTaskModal
        type="edit"
        isOpen={isOpen}
        onClose={onClose}
        list={
          currentList
            ? { id: currentList.id, title: currentList.title }
            : undefined
        }
      />
      <Flex flexDirection="column" w="100%" h="100%" gap="20px" p={4}>
        <Text fontSize="20px" fontWeight={700}>
          Все задачи
        </Text>
        <Flex
          flexDirection="column"
          w="100%"
          h="100%"
          overflowY="auto"
          gap="10px"
          p={4}
          borderRadius="8px"
          bg="gray.50"
        >
          {allTasks.length > 0 ? (
            allTasks.map((task) => (
              <Flex
                key={task.id}
                w="100%"
                p={3}
                borderRadius="8px"
                alignItems="center"
                bg="white"
                borderWidth="1px"
                borderColor="gray.200"
                cursor="pointer"
                _hover={{ borderColor: 'blue.300' }}
                onClick={() => handleTaskClick(task)}
              >
                <Flex onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    isChecked={task.completed}
                    mr={3}
                    _hover={{ borderColor: 'blue.300' }}
                    onChange={() => handleCheckboxChange(task)}
                  />
                </Flex>
                <Text
                  fontSize="16px"
                  fontWeight={500}
                  textDecoration={task.completed ? 'line-through' : 'none'}
                  color={task.completed ? 'gray.500' : 'inherit'}
                >
                  {task.title}
                </Text>
                {task.priority && (
                  <Badge
                    ml="auto"
                    colorScheme={
                      task.priority === 'high'
                        ? 'red'
                        : task.priority === 'medium'
                          ? 'orange'
                          : 'green'
                    }
                  >
                    {task.priority}
                  </Badge>
                )}
              </Flex>
            ))
          ) : (
            <Flex justify="center" align="center" h="100%" color="gray.500">
              <Text fontSize="18px">Нет задач во всех списках</Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  )
}
