import * as actions from "../actions/actionTypes";

const initialState = {
    posts: [],
    topUsers: [],
    newUsers: [],
    loadingTop: false,
    loadingPosts: false,
    loadingNew: false,
    errorTop: null,
    errorNew: null,
    errorPosts: null,
    likedPost: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_TOP_USERS_START:
            return {
                ...state,
                loadingTop: true,
            }
        case actions.GET_TOP_USERS_SUCCESS:
            return {
                ...state,
                topUsers: action.payload,
                loadingTop: false,
            }
        case actions.GET_TOP_USERS_FAILURE:
            return {
                ...state,
                loadingTop: false,
                errorTop: action.payload,
            }
        case actions.GET_NEW_USERS_START:
            return {
                ...state,
                loadingNew: true,
            }
        case actions.GET_NEW_USERS_SUCCESS:
            return {
                ...state,
                loadingNew: false,
                newUsers: action.payload,
            }
        case actions.GET_NEW_USERS_FAILURE:
            return {
                ...state,
                loadingNew: false,
                errorNew: action.payload
            }
        case actions.GET_POSTS_START:
            return {
                ...state,
                loadingPosts: true
            }
        case actions.GET_POSTS_SUCCESS:
            const posts = state.posts;
            action.payload.forEach(item => posts.push(item))
            // console.log(posts);
            return {
                ...state,
                loadingPosts: false,
                posts: posts
            }
        case actions.GET_POSTS_FAILURE:
            return {
                ...state,
                loadingPosts: false,
                errorPosts: action.payload
            }
        case actions.CLEAR_USER:
            return {
                ...state,
                posts: [],
                topUsers: [],
                newUsers: [],
                errorTop: null,
                errorNew: null,
                errorPosts: null,
            }
        case actions.CREATE_POST_SUCCESS:
            //console.log(action.payload)
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case actions.CREATE_COMMENT_SUCCESS:
            const newPosts = state.posts.map(post => {
                if (post._id.toString() === action.payload._id.toString()) {
                    const newComment = action.payload.comments.pop()
                    return {
                        ...post,
                        comments: [newComment, ...post.comments]
                    }
                }
                return { ...post }
            })
            return {
                ...state,
                errorPosts: null,
                posts: newPosts
            }
        case actions.LIKE_POST_SUCCESS:
            // console.log(action.payload)
            const newLikePosts = state.posts.map(post => {
                if (post._id.toString() === action.payload._id.toString()) {
                    const newLike = action.payload.likes.pop()
                    return {
                        ...post,
                        likes: [...post.likes, newLike]
                    }
                }
                return { ...post }
            })
            return {
                ...state,
                posts: newLikePosts
            }
        case actions.UNLIKE_POST_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
            }


        default:
            return state;
    }
}