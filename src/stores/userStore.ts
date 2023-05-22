import { create } from 'zustand';
import Cookies from 'js-cookie';

type userType = {
    token: string | undefined;
    setToken: (token: string | undefined) => void;
};

export const useUserStore = create<userType>((set) => ({
    token: Cookies.get('token'),
    setToken: (token: string | undefined) => {
        if (token === undefined) {
            Cookies.remove('token');
        } else {
        Cookies.set('token', token, { expires: 1 });  // Устанавливает токен на срок в 1 день
        }
        set(() => ({ token }));
    },
}));
