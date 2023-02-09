import {Default} from "../../Layout/Default";
import {useTodos} from "../../hooks/useTodos";
import styled from "@emotion/styled";
import React, {useEffect, useState} from "react";
import {Heading, VStack} from "@chakra-ui/react";
import {createTodo, deleteTodo, updateTodo} from "../../apis/todo-api";
import {AddTodo} from "../AddTodo";
import {Todos} from "./todos";
import ErrorMessage from "../../modules/ErrorMessage";
import {UpdateTodoDto} from "../../apis/dtos/TodoDto";


const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;


export function ConnectTodos() {
    const {todos, setTodos} = useTodos();
    const [error, setError] = useState('');

    const handleCreateTodo = async (todoText: string) => {
        createTodo({todo: todoText})
            .then(response => {
                setTodos([response.data, ...todos])
                setError('')
            })
            .catch(e => {
                setError(e.response.data.message)
            })
    }

    const handleDeleteTodo = async (todoId: number) => {
        deleteTodo(todoId)
            .then(response => {
                setTodos(todos.filter(todo => todo.id !== todoId))
                setError('')
            })
            .catch(e => {
                setError(e.response.data.message)
            })
    }

    const handleUpdate = async (todoId: number, todo: UpdateTodoDto) => {
        updateTodo(todoId, todo)
            .then(response => {
                setTodos([response.data, ...todos.filter(todo => todo.id !== todoId)])
                setError('')
            })
            .catch(e => {
                setError(e.response.data.message)
            })
    }


    return (
        <Default pageName={"ToDo List"}>
            <Wrapper>
                <VStack minW={'500'}>
                    {error && <ErrorMessage message={error}/>}
                    <Heading
                        p='5'
                        fontWeight='extrabold'
                        size='xl'
                        bgGradient='linear(to-l, teal.300, blue.500)'
                        bgClip='text'
                    >
                        JUST DO IT.
                    </Heading>
                    <AddTodo addTodo={handleCreateTodo}/>
                    <Todos createTodo={handleCreateTodo} deleteTodo={handleDeleteTodo} updateTodo={handleUpdate}
                           todos={todos}/>
                </VStack>
            </Wrapper>
        </Default>
    )
}