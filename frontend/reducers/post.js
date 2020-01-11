export const initialState = {
    mainPosts: [{
        User: {
            id: 1,
            nickname: '표서쿤',
        },
        content: '첫 번째 게시글',
    }],
};

const ADD_POST = 'ADD_POST';
const ADD_DUMMY = 'ADD_DUMMY';

const addPost = {
    type: ADD_POST,
};
const addDummy = {
    type: ADD_DUMMY,
    data: {
        content: 'Hello',
        UserId: 1,
        User: {
            nickname: '표서쿤',
        },
    },
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST:
        case ADD_DUMMY: {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts],
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;