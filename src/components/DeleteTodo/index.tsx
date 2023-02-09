import {
    Button,
    IconButton,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

export function DeleteTodo({ todo, deleteTodo}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <IconButton
                aria-label="Delete Icon"
                icon={<DeleteIcon />}
                isRound={true}
                onClick={onOpen}
            />

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w='90%'>
                    <ModalHeader>
                        정말 때려치우시겠습니까 ?
                    </ModalHeader>
                    <ModalBody>
                        <Text>{todo.todo}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>아니오</Button>
                        <Button colorScheme='blue' onClick={() => deleteTodo(todo.id, onClose)}>
                            네
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}