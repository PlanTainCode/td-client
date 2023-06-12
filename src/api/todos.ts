import { api } from './const';

export const createTodo = ( title: string) => 
    api.post('/todo', { title });

export const getAllTodos = () => 
    api.get('/todo');

export const deleteTodo = (id: number) => 
    api.delete(`/todo/${id}`);

