import {
    Button,
    FormControl,
    IconButton, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";import {useState, useRef} from "react";
import {EditIcon} from "@chakra-ui/icons";
import {Todo} from "../../types";
import {UpdateTodoDto} from "../../apis/dtos/TodoDto";

interface IUpdateTodoProps {
    todo: Todo
    updateTodo: (todoId, todo: UpdateTodoDto) => void
}

function UpdateTodo({ todo, updateTodo }: IUpdateTodoProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [text, setText] = useState('');
    const initialRef = useRef()

    const handleUpdateTodo = () => {
        updateTodo(todo.id, {isCompleted: todo.isCompleted, todo: text})
        onClose()
    }

    return (
        <>
            <IconButton
                aria-label="Delete Icon"
                icon={<EditIcon />}
                isRound={true}
                onClick={onOpen}
            />
            <Modal
                isCentered
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent w='90%'>
                    <ModalHeader>수정할 내용을 입력해 주세요.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input ref={initialRef} placeholder='입력해 주세요.' defaultValue={todo.todo} onChange={(e) => setText(e.target.value)} onFocus={(e) => setText(e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>취소</Button>
                        <Button colorScheme='blue'  onClick={() => handleUpdateTodo()}>
                            확인
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateTodo;