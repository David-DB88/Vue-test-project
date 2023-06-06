

export const userModule ={
    state: () => ({
        user: '',
        auth: false
    }),
    mutations: {
        setUser(state, name) {
            state.auth = true
            state.user = name
            localStorage.setItem('user', name)
        },
        LogOut(state) {
            localStorage.removeItem('user')
            state.auth = false
        }
    },
    namespaced: true
}