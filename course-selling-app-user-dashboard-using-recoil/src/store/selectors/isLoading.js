import { selector } from 'recoil';
import { userstate } from '../atoms/user';

export const loadingState = selector({
    key: 'loadingState',
    get: ({get}) => {
        const state = get(userstate);

        return state.isLoading;
    }
})