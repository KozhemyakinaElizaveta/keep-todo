import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
//import { AddIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

interface TodoFormProps {
    addTodo: (todo: string) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value) {
        addTodo(value);
        setValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup size='md' width='30rem' mt='1rem'>
                <Input
                    pr='4.5rem'
                    width='30rem'
                    placeholder='What is the task today?'
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <InputRightElement width='6rem'>
                    <Button h='1.75rem' size='sm' type="submit" mr='0.1rem'>
                    Add Task
                    </Button>
                </InputRightElement>
            </InputGroup>
        
        </form>
    );
};
