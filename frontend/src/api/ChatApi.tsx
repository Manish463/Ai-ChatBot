import axios from 'axios';

const apiUri=import.meta.env.VITE_API_URL;

const API = axios.create({
    baseURL: apiUri
});

export const getChats = async () => {
    const {data} = await API.get('/chats');
    return data;
}

export const createChat = async () => {
    const response = await API.post('/chats');
    return response.data;
}

export const deleteChat = async (id: any) => {
    const response = await API.delete(`/chats/${id}`);
    return response.data;
}

export const renameChat = async (id: string, newName: string) => {
    const response = await API.patch(`/chats/${id}`, {newName});
    return response.data;
}

export const updateChat = async (id: string, msg: string) => {
    const response = await API.post(`/chats/${id}`, {msg});
    return response.data;
}