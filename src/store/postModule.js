import axios from "axios";


export const postModule ={
    state: ()=>({
            posts: [],
            post: {},
            comments: [],
            isPostLoading: false,
            onePostLoading: false,
            selectedOption: '',
            searchedQuery: '',
            currentPage: 1,
            totalPages: 0,
            limit: 10,
            postOption: [
                {value: 'title', name: 'Post Name'},
                {value: 'body', name: 'Post Description'}
            ],
            user: {}
    }),
    getters: {
        sortedPosts(state){
            return [...state.posts].sort((post1, post2)=>post1[state.selectedOption]?.localeCompare(post2[state.selectedOption]))

        },
        searchedSortedPosts(state, getters){
            return getters.sortedPosts.filter(item=>item.title.toLowerCase().includes(state.searchedQuery.toLowerCase()))
        }
    },
    mutations: {
        setComments(state, comments){
            state.comments = comments
        },
        setPosts(state, posts){
          state.posts = posts
        },
        setIsPostLoading(state, isPostLoading){
            state.isPostLoading = isPostLoading
        },
        setPost(state, post){
          state.post = post
        },
        setPostLoading(state, onePostLoading){
            state.onePostLoading = onePostLoading
        },
        setSelectedOption(state, selectedOption){
            state.selectedOption = selectedOption
        },
        setSearchedQuery(state, searchedQuery){
            state.searchedQuery = searchedQuery
        },
        setCurrentPage(state, currentPage){
            state.currentPage = currentPage
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages
        },
        setPostOption(state, postOption){
            state.postOption = postOption
        },
    },
    actions: {
        async fetchPost({state, commit}, id){

            try{
                commit('setPostLoading', true);
                const response = await axios.get(`http://localhost:8081/posts/${id}`);
                commit('setPost', response.data)
            }catch (e){
                console.log('error',e)
            }finally {
                commit('setPostLoading', false);
            }
        },
        async fetchPosts({state, commit}){
            try{
                commit('setIsPostLoading', true);
                const response = await axios.get('https://json-server-vercel-vue.vercel.app/posts',{
                    params: {
                        _page: state.currentPage,
                        _limit: state.limit,

                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', response.data)
            }catch (e){
                console.log('error',e)
            }finally {
                commit('setIsPostLoading', false);
            }
        },
        async createPost({state, commit}, post){
            try{
                const response = await axios.post('http://localhost:8081/posts', post);
                commit('setPosts', [...state.posts, response.data])
            }catch (e){
                console.log('error',e)
            }
        },
        async editPost({state, commit}, post){
            try{
                const response = await axios.patch('https://json-server-vercel-vue.vercel.app/posts/' + post.id, {
                    title: post.title,
                    body: post.body
                });
                commit('setPosts', state.posts.map(post => post.id === response.data.id ? response.data: post))

            }catch (e){
                console.log('error',e)
            }
        },
        async deletePost({state, commit}, id){
            try{
                await axios.delete(`https://json-server-vercel-vue.vercel.app/posts/`+ id);

            }catch (e){
                console.log('error',e)
            }finally {
            }
        },
        async loadMorePosts({state, commit}){
            commit('setCurrentPage', state.currentPage+1)
            try{
                const response = await axios.get(`https://json-server-vercel-vue.vercel.app/posts`, {
                    params: {
                        _page: state.currentPage,
                        _limit: state.limit,

                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
                commit('setPosts', [...state.posts, ...response.data ])

            }catch (e){
                console.log("error",e)
            }finally {
            }


        },


        //Comments Actions
        async fetchComments({commit}){
            try{
                const response = await axios.get('https://json-server-vercel-vue.vercel.app/comments');
                commit('setComments', response.data)

            }catch (e){
                console.log('error',e)
            }finally {
            }
        },
        async createComment({state, commit}, newComment){
            const {postId, text: comment, name} = newComment
            try{
                const response = await axios.post(`https://json-server-vercel-vue.vercel.app/posts/${postId}/comments`,
                    {
                        name,
                        comment,
                        postId
                    });
                commit('setComments', [...state.comments, response.data])
            }catch (e){
                console.log('error',e)
            }
        },
        async editComment({state, commit}, editedComment){
            const {id, comment} = editedComment
            try{
                const response = await axios.patch(`https://json-server-vercel-vue.vercel.app/comments/${id}`,
                    {
                        comment
                    });
                commit('setComments', [...state.comments.map(item => item.id === response.data.id ? response.data: item)])
            }catch (e){
                console.log('error',e)
            }
        },

    },
    namespaced: true
}