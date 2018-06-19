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
    error: {}
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

        // Get posts

        case actions.GET_POSTS_START:
            return {
                ...state,
                loadingPosts: true
            }
        case actions.GET_POSTS_SUCCESS:
            //console.log(action.payload)
            const posts = [...action.payload];
            // action.payload.forEach(item => posts.push(item))
            // console.log(posts);

            return {
                ...state,
                loadingPosts: false,
                posts: [...state.posts, ...posts]
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

        // Create Comment

        case actions.DASHBOARD_CREATE_COMMENT_SUCCESS:
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

        // Like post

        case actions.DASHBOARD_LIKE_POST_SUCCESS:
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

        // Unlike Post

        case actions.DASHBOARD_UNLIKE_POST_SUCCESS:
            // console.log(action.payload)

            const newUnLikePosts = state.posts.map(post => {
                if (post._id.toString() === action.payload.data._id.toString()) {
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

        // Delete post

        case actions.DASHBOARD_DELETE_POST_SUCCESS:
            console.log(action.payload)
            const deletedPosts = state.posts;
            deletedPosts.pop()
            return {
                ...state,
                posts: deletedPosts
            }

        case actions.DASHBOARD_DELETE_POST_FAILURE:
            return {
                ...state,
                error: { dashboardDeleteError: action.payload }
            }

        default:
            return state;
    }
}