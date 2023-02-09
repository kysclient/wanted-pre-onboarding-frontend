import {Button, HStack, Input, useToast} from "@chakra-ui/react";
import React, { useState } from "react";

interface IAddTodoProps {
    addTodo: (todo: string) => void;
}

export function AddTodo({ addTodo } : IAddTodoProps) {
    const toast = useToast();
    const [todo, setTodo] = useState('');
    const [statusInput, setStatusInput] = useState(true);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const taskText = todo.trim();

        if (!taskText) {
            toast({
                title: '목표가 없으신가요?',
                position: 'top',
                status: 'warning',
                duration: 2000,
                isClosable: true,
            });
            setStatusInput(false);

            return setTodo('');
        }
        addTodo(todo);
        setTodo('');
    }

    if (todo && !statusInput) {
        setStatusInput(true);
    }
    return (
        <form onSubmit={handleSubmit} style={{width:'100%'}}>
            <HStack mt='4' mb='4'>
                <Input
                    data-testid="new-todo-input"
                    h='46'
                    borderColor={!statusInput ? 'red.300' : 'transparent'}
                    variant='filled'
                    placeholder='입력하세요.'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <Button
                    data-testid="new-todo-add-button"
                    colorScheme='blue'
                    px='8'
                    pl='10'
                    pr='10'
                    h='46'
                    type='submit'>추가</Button>
            </HStack>
        </form>
    )
}