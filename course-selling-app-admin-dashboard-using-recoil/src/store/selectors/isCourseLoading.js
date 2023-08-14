import { courseState } from "../atoms/course";
import { selector } from "recoil";

export const isCourseLoading = selector({
    key: 'isLoadingState',
    get: ({get}) => {
        const state = get(courseState);

        return state.isLoading;
    }
})