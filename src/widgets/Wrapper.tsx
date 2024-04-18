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
    const [users, setUsers] = useState<any[]>([]); 
    const [userNew, setNewUser] = useState<any[]>([]); 

    useEffect(() => {
        const usersString = localStorage.getItem("users");
        const usersData = usersString ? JSON.parse(usersString) : [];
        setUsers(usersData);
        setTodos(getCurrentTodos())
    }, []);

    const getCurrentUser = () => {
        const currentUserString = localStorage.getItem("currentUser");
        const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

        return currentUser;
    };

    const getCurrentTodos = () => {
        const currentUser = getCurrentUser();
        const currentTodos = users.map(curuser => {
            if(curuser.username === currentUser.username) {
                return curuser.todos;
            } else {
                return [];
            }
        });
    
        return currentTodos.flat();
    };

    const addTodo = (todo: string) => {
        const newTodo: Todo = { id: uuidv4(), task: todo, completed: false, isEditing: false };

        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);

        const user = getCurrentUser()
        user.todos = updatedTodos;
        setNewUser(user);
        console.log(user)

        const updatedUser = { ...user, todos: updatedTodos }; 
        setNewUser(updatedUser);

        const updatedUsers = users.map(curuser => {
            if(curuser.username === user.username) {
                return updatedUser;
            }
            return curuser;
        });
    
        setUsers(updatedUsers); 
        localStorage.setItem("users", JSON.stringify(updatedUsers));
    };

    const toggleComplete = (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);

        const currentUser = getCurrentUser();
        currentUser.todos = updatedTodos;

        setUsers(users => [...users]);
    };

    const deleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);

        const currentUser = getCurrentUser();
        currentUser.todos = updatedTodos;

        setUsers(users => [...users]);
    };

    const editTodo = (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        );
        setTodos(updatedTodos);

        const currentUser = getCurrentUser();
        currentUser.todos = updatedTodos;

        setUsers(users => [...users]);
    };

    const editTask = (task: string, id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        );
        setTodos(updatedTodos);

        const currentUser = getCurrentUser();
        currentUser.todos = updatedTodos;

        setUsers(users => [...users]);
    };

    return (
        <Contain>
            <Flex alignItems="center" justifyContent="center" flexDir="column">
                <Heading as="h1" fontWeight={600} size="xl">
                    Keep TODO
                </Heading>
                <TodoForm addTodo={addTodo} />
                {getCurrentTodos().map(todo =>
                    todo.isEditing ? (
                        <Edit key={todo.id} editTodo={editTask} task={todo} />
                    ) : (
                        <TodoItem
                            key={todo.id}
                            task={todo}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                            editTodo={editTodo}
                        />
                    )
                )}
            </Flex>
        </Contain>
    );
};
