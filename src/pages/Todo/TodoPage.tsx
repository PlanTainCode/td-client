import {useState, useEffect, FC} from "react";
import Layout from "../../containers/layout/Layout";
import InputFormAuth from "../../UI/inputs/InputFormAuth/InputFormAuth";
import { Box, ButtonGroup, HStack, IconButton, Text, VStack, WrapItem } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { createTodo, deleteTodo, getAllTodos } from "../../api/todos";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
    const [todoValue, setTodoValue] = useState<string>('')
    const [stateAction, setStateAction] = useState<any>()
    const [todos, setTodos] = useState<Array<{creatadAt: string, id: number, state: string, title: string, updatedAt: string}>>()

    const navigate = useNavigate()

    const addTodo = async (value: string) => {
        const res = await createTodo(value)

        if (res.data) {
            // console.log(res.data)
            setStateAction(res)
        }
    }

    const getTodosAndRefresh = async () => {
        const res = await getAllTodos()

        // console.log(res)
        setTodos(res.data)
    }

    const deleteTodoAs = async (id: number) => {
        const res = await deleteTodo(id)

        setStateAction(res)
    }

    useEffect(() => {
        getTodosAndRefresh()
    }, [navigate, stateAction])

    useEffect(() => {
        console.log(todos)
    }, [todos]);

    interface ITodoItemProps {
        id: number,
        title: string,
        state: string
    }

    const TodoItem:FC<ITodoItemProps> = ({id, title, state}) => {
        return (
            <WrapItem key={id}>
                <Box maxWidth={'300px'} w='100%' display={'flex'} padding={'10px'} borderRadius={'10'} justifyContent={'space-between'} alignItems={'flex-start'} backgroundColor={'gray.100'}>
                    <Text fontWeight={'600'}>{title}</Text>
                    <ButtonGroup ml={'2'}>
                        <IconButton aria-label="Редактировать" icon={<EditIcon />} />
                        <IconButton onClick={() => deleteTodoAs(id)} aria-label="Удалить" icon={<DeleteIcon />} />
                    </ButtonGroup>
                </Box>
            </WrapItem>
        )
    }

    return (
        <Layout>
            <HStack align={'center'}>
                <InputFormAuth type="text" value={todoValue} setValue={setTodoValue} placeholder="Напиши что-то" />
                <IconButton aria-label="Добавить" icon={<AddIcon />} onClick={() => {addTodo(todoValue); setTodoValue('')}} />
            </HStack>
            <VStack alignItems={'left'} pt={'10px'} spacing={'3'}>
                {todos !== undefined && todos.map((item) => (
                    <TodoItem id={item.id} title={item.title} state={item.state} />
                ))}
            </VStack>
        </Layout>
    )
}

export default TodoPage