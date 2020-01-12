export const initialState = {
    isLoggedIn: false,      // 로그인 여부
    isLoggingOut: false,    // 로그아웃 시도중
    isLoggingIn: false,     // 로그인 시도중
    logInErrorReason: '',   // 로그인 실패 사유
    isSignedUp: false,      // 회원가입 성공
    isSigningUp: false,     // 회원가입 시도중
    signUpErrorReason: '',  // 회원가입 실패 사유
    me: null,               // 내 정보
    followingList: [],      // 팔로잉 리스트
    followerList: [],       // 팔로워 리스트
    userInfo: null,         // 남의 정보
};

const dummyUser = {
    nickname: '표서쿤',
    Post: [],
    Followings: [],
    Followers: [],
    id: 1,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'LOG_OUT_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'LOG_OUT_FAILURE';
// 로그인 했을 때 유저의 역할을 load 하기 위함
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
// 팔로워, 팔로잉 불러오기
export const LOAD_FOLLOW_REQUEST = 'LOAD_FOLLOW_REQUEST';
export const LOAD_FOLLOW_SUCCESS = 'LOAD_FOLLOW_SUCCESS';
export const LOAD_FOLLOW_FAILURE = 'LOAD_FOLLOW_FAILURE';
// 유저를 팔로윙하는 역할
export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';
// 유저를 언팔로잉 하는 역할
export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';
// 내 팔로워 이상한 사람 없애는 액션
export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';
// 리듀서의 단점때문에 만들어낸 액션이라고 합니다..
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';

// 본 강의에서 action을 만들기 힘들다면 그냥 코드에 바로 action type을 넣기로 함.

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOG_IN_REQUEST: {
            return{
                ...state,
                isLoggedIn: false,
                logInErrorReason: '',
            }
        }
        case LOG_IN_SUCCESS: {
            return{
                ...state,
                me: dummyUser,
                isLoggingIn: false,
                isLoggedIn: true,
                isLoading: false,
            }
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                me: null,
                isLoggingIn: false,
                isLoggedIn: false,
                logInErrorReason: action.error,
            };
          }
        case LOG_OUT_REQUEST: {
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            }
        }
        case SIGN_UP_REQUEST: {
            return {
                ...state,
                isSigningUp: true,
                isSignedUp: false,
                signUpErrorReason: '',
            };
          }
        case SIGN_UP_SUCCESS: {
            return {
                ...state,
                isSigningUp: false,
                isSignedUp: true,
            };
          }
          case SIGN_UP_FAILURE: {
            return {
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error,
            };
          }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;