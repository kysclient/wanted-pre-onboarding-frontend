import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Todo} from "../../types";
import {Box, Checkbox, HStack, Input, StackDivider, VStack} from "@chakra-ui/react";
import {Image, Text} from '@chakra-ui/react'
import img from '../../images/empty.svg'
import {DeleteTodo} from "../DeleteTodo";
import {UpdateTodoDto} from "../../apis/dtos/TodoDto";
import UpdateTodo from "../UpdateTodo";

interface ITodosProps {
    createTodo: (todoText: string) => void
    updateTodo: (todoId: number, todo: UpdateTodoDto) => void
    deleteTodo: (todoId: number) => void
    todos: Todo[]
}

export function Todos({todos, createTodo, updateTodo, deleteTodo}: ITodosProps) {

    const navigate = useNavigate()


    const handleComplete = (e: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
        updateTodo(todo.id, {isCompleted: e.target.checked, todo: todo.todo})
    }

    useEffect(() => {
        if (localStorage.getItem('ACCESS_TOKEN') === null) {
            navigate("/signin")
        }
    }, [localStorage.getItem('ACCESS_TOKEN')])

    if (todos.length < 1) {
        return (
            <Box maxW='80%'>
                <Image mt='20px' w='98%' maxW='350' src={img} alt='Todo Image'/>
            </Box>
        )
    }

    return (
        <VStack
            divider={<StackDivider/>}
            borderColor='gray.100'
            borderWidth='2px'
            p='5'
            borderRadius='lg'
            w='100%'
            maxW={{base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw'}}
            alignItems='stretch'
        >
            <ul style={{listStyle: 'none'}}>
                {todos
                    .sort((a, b) => {
                        if(a.isCompleted){
                            return 1;
                        }else if(b.isCompleted){
                            return -1;
                        }else{
                            return 0;
                        }
                    })
                    .map((todo) => (
                    <li
                        style={{padding: '10px'}}
                        key={todo.id}
                    >
                        <HStack
                            opacity={todo.isCompleted ? '0.2' : '1'}
                        >
                            <Checkbox size='md' colorScheme='green' isChecked={todo.isCompleted} onChange={(e) => {
                                handleComplete(e, todo)
                            }}/>
                            <Text
                                w='100%'
                                p='8px'
                                borderRadius='lg'
                                as={todo.isCompleted ? 's' : 'b'}
                                cursor='pointer'>
                                {todo.todo}
                            </Text>
                            <DeleteTodo todo={todo} deleteTodo={deleteTodo}/>
                            <UpdateTodo todo={todo} updateTodo={updateTodo} />
                        </HStack>
                    </li>
                ))}
            </ul>
        </VStack>
    )
}