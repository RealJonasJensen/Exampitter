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

        // Load Page

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

        // Create Comment Page

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
                error: {},
                posts: newPosts
            }

        case actions.PAGE_CREATE_COMMENT_FAILURE:
            console.log(action.payload)
            return {
                ...state,
                error: { createComment: action.payload }
            }

        // Like / Unlike Post Page

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

        // Page Delete Comment

        case actions.PAGE_DELETE_COMMENT_SUCCESS:
            console.log(action.payload)
            // Get Post Id
            const postId = action.payload.data._id;
            // Get comment Id
            const commentId = action.payload.commentId;
            // Map Posts to Find Post with Commment
            const newDeletedCommentPosts = state.posts.map(post => {
                if (postId.toString() === post._id.toString()) {
                    console.log("This is the one!")
                    // Find Comment
                    const removeComment = post.comments.find(comment => comment._id === commentId);
                    // Find comment index
                    const removeCommentIndex = post.comments.indexOf(removeComment);
                    // Splice the Comment out
                    const newComments = [...post.comments]
                    newComments.splice(removeCommentIndex, 1);

                    return {
                        ...post,
                        comments: newComments
                    }
                }
                return {
                    ...post
                }
            })

            //console.log(newDeletedCommentPosts)
            return {
                ...state,
                posts: newDeletedCommentPosts
            }

        case actions.PAGE_DELETE_POST_SUCCESS:
            // Get Post ID
            const deletePostId = action.payload.id;
            //console.log(deletePostId)
            // Get Posts
            let deletedPosts = state.posts;
            //console.log(deletedPosts)
            // Find Post
            const deletedPost = deletedPosts.find(post => post._id === deletePostId)
            //console.log(deletedPost)
            // Find Index
            const removeIndexPage = deletedPosts.indexOf(deletedPost);
            //console.log(removeIndexPage);
            // Splice
            deletedPosts.splice(removeIndexPage, 1);
            //console.log(deletedPosts)
            return {
                ...state,
                posts: [...deletedPosts]
            }

        // Follow a User

        case actions.FOLLOW_USER_SUCCESS:

            console.log(action.payload)

            const newFollowedFollowers = state.user.followers;
            const follower = {
                _id: action.payload.currentUser.id,
                user: {
                    ...action.payload.currentUser,
                    _id: action.payload.currentUser.id
                }
            }
            newFollowedFollowers.push(follower);

            return {
                ...state,
                user: {
                    ...state.user,
                    followers: newFollowedFollowers
                }
            }

        // Unfollow a user

        case actions.UNFOLLOW_USER_SUCCESS:
            // Copy State Followers
            const newUnfollowedFollowers = state.user.followers;
            // Find The Follower
            const removeFollower = newUnfollowedFollowers.find(follower => follower.user._id === action.payload.currentUser.id);
            // Find Follower Index
            const removeIndex = newUnfollowedFollowers.indexOf(removeFollower);
            // Splice Out of Followers
            newUnfollowedFollowers.splice(removeIndex, 1)
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: newUnfollowedFollowers
                }
            }


        default:
            return state;
    }
}