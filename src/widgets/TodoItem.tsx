import React from 'react';
import { Flex, Text, Icon } from '@chakra-ui/react';
import { Todo } from './Wrapper';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface TodoProps {
    task: Todo;
    deleteTodo: (id: string) => void;
    editTodo: (id: string) => void;
    toggleComplete: (id: string) => void;
}

export const TodoItem: React.FC<TodoProps> = ({ task, deleteTodo, editTodo, toggleComplete }) => {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            width={'30rem'}
            mt={'0.1rem'}
            padding="0.5rem"
            borderRadius="md"
            _hover={{
                bgColor: 'gray.100',
                '.edit-icon': { opacity: 1 },
                '.delete-icon': { opacity: 1 },
            }}
            cursor="pointer"
            onClick={() => toggleComplete(task.id)}
        >
            <Text
                pl='0.5rem'
                flex="1"
                textDecoration={task.completed ? 'line-through' : 'none' }
                onClick={() => toggleComplete(task.id)}
            >
                {task.task}
            </Text>
            <Flex gap="0.5rem" className="edit-delete-icons">
                <Icon
                    as={EditIcon}
                    color='blue.800'
                    className="edit-icon"
                    opacity={0}
                    onClick={(e) => {
                        e.stopPropagation();
                        editTodo(task.id);
                    }}
                />
                <Icon
                    as={DeleteIcon}
                    color='blue.800'
                    className="delete-icon"
                    opacity={0}
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteTodo(task.id);
                    }}
                />
            </Flex>
        </Flex>
    );
};



