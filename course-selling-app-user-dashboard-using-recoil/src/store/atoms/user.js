import { atom } from 'recoil';

export const userstate = atom({
    key: 'userstate',
    default: {
        isLoading: true,
        userEmail: null
    }
})
