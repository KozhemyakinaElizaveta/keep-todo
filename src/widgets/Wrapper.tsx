import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { TodoItem } from './TodoItem';
import { Edit } from './Edit';
import { Flex } from '@chakra-ui/react';
import { Contain } from './Contain';
import { Heading } from '../shared/config/chakraTheme/ui';

export interface Todo {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
}

export const Wrapper: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [username, setUsername] = useState<string>('');

    useEffect(() => {
        const savedUsername = localStorage.getItem('username') || '';
        const savedTodos = JSON.parse(localStorage.getItem(`todos_${savedUsername}`) || '[]') as Todo[];
        setTodos(savedTodos);
        setUsername(savedUsername);
    }, []);

    const addTodo = (todo: string) => {
        const newTodos: Todo[] = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
        setTodos(newTodos);
        localStorage.setItem(`todos_${username}`, JSON.stringify(newTodos));
    };

    const toggleComplete = (id: string) => {
        const newTodos: Todo[] = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
        setTodos(newTodos);
        localStorage.setItem(`todos_${username}`, JSON.stringify(newTodos));
    };

    const deleteTodo = (id: string) => {
        const newTodos: Todo[] = todos.filter(todo => todo.id !== id);
        setTodos(newTodos);
        localStorage.setItem(`todos_${username}`, JSON.stringify(newTodos));
    };

    const editTodo = (id: string) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo)));
    };

    const editTask = (task: string, id: string) => {
        const newTodos: Todo[] = todos.map(todo =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        );
        setTodos(newTodos);
        localStorage.setItem(`todos_${username}`, JSON.stringify(newTodos));
    };

    return (
        <Contain >
            <Flex alignItems="center" justifyContent="center" flexDir={'column'} >
                <Heading as="h1" fontWeight={600} size="xl">
                    Keep TODO
                </Heading>
                <TodoForm addTodo={addTodo}/>
                {todos.map(todo =>
                    todo.isEditing ? (
                    <Edit key={todo.id} editTodo={editTask} task={todo} />
                    ) : (
                    <TodoItem key={todo.id} task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                    )
                )}
            </Flex>
        </Contain>
    );
};
