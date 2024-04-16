import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Task {
    id: string;
    task: string;
    completed: boolean;
    isEditing: boolean;
}

interface EditTodoFormProps {
    editTodo: (task: string, id: string) => void;
    task: Task;
}

export const Edit: React.FC<EditTodoFormProps> = ({ editTodo, task }) => {
    const [value, setValue] = useState<string>(task.task);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        editTodo(value, task.id);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="TodoForm">
        <InputGroup size='md' width='30rem' mt='0.5rem'>
                <Input
                    pr='4.5rem'
                    width='30rem'
                    placeholder='Update task'
                    onChange={handleChange}
                    value={value}
                />
                <InputRightElement width='6rem'>
                    <Button h='1.75rem' size='sm' type="submit" mr='0.5rem'>
                    Update Task
                    </Button>
                </InputRightElement>
        </InputGroup>
        </form>
    );
};
