import { Flex, Text } from '@chakra-ui/react';
import { selectAllLists } from 'entities/project/model/selectors';
import { setCurrentList } from 'entities/project/model/slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const Boards = () => {
  const lists = useSelector(selectAllLists);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const declenseTaskWord = (count: number) => {
    if (count % 100 >= 11 && count % 100 <= 14) {
      return 'задач';
    }
    
    switch (count % 10) {
      case 1:
        return 'задача';
      case 2:
      case 3:
      case 4:
        return 'задачи';
      default:
        return 'задач';
    }
  };

  return (
    <Flex flexDirection="column" w="100%" h="100%" gap="20px" p={4}>
      <Text fontSize="20px" fontWeight={700}>
        Мои списки задач
      </Text>
      <Flex
        flexDirection="column"
        w="100%"
        h="100%"
        overflowY="auto"
        gap="10px"
      >
        {lists.length > 0 ? (
          lists.map((list) => (
            <Flex
              key={list.id}
              w="100%"
              backgroundColor="gray.100"
              p="12px"
              borderRadius="8px"
              alignItems="center"
              cursor="pointer"
              _hover={{ bg: 'gray.200' }}
              onClick={() => {
                dispatch(setCurrentList(list))
                navigate(`/keep-todo/list/${list.id}`)}
              }
            >
              <Text fontSize="16px" fontWeight={500}>
                {list.title}
              </Text>
              <Text ml="auto" fontSize="14px" color="gray.500">
                {list.tasks?.length || 0} {declenseTaskWord(list.tasks?.length || 0)}
              </Text>
            </Flex>
          ))
        ) : (
          <Flex 
            justify="center" 
            align="center" 
            h="100%"
            color="gray.500"
          >
            <Text fontSize="18px">
              У вас пока нет списков задач
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};