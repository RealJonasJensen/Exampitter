import * as actions from "../actions/actionTypes";

const initialState = {
    user: {},
    posts: [],
    loadingUser: false,
    loadingPosts: false,
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_USER_PAGE_START:
            return {
                ...state,
                loadingUser: true
            }
        case actions.GET_USER_PAGE_FAILURE:
            return {
                ...state,
                loadingUser: false,
                error: action.payload
            }
        case actions.GET_USER_PAGE_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loadingUser: false,
                user: action.payload
            }
        case actions.GET_USER_PAGE_POSTS_START:
            return {
                ...state,
                loadingPosts: true
            }
        case actions.GET_USER_PAGE_POSTS_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loadingPosts: false,
                posts: action.payload
            }
        case actions.GET_USER_PAGE_POSTS_FAILURE:
            return {
                ...state,
                loadingPosts: false,
                error: action.payload
            }
        case actions.PAGE_CREATE_COMMENT_SUCCESS:
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

        case actions.PAGE_LIKE_POST_SUCCESS:
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
            };

        case actions.PAGE_UNLIKE_POST_SUCCESS:
            // console.log(action.payload)

            const newUnLikePosts = state.posts.map(post => {
                if (post._id.toString() === action.payload._id.toString()) {
                    const newLikes = [...post.likes];
                    newLikes.pop();

                    return {
                        ...post,
                        likes: newLikes,
                    }
                }
                return { ...post }
            })

            return {
                ...state,
                posts: newUnLikePosts
            }

        default:
            return state;
    }
}