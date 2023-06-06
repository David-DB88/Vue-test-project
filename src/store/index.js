import {createStore} from "vuex";
import {postModule} from "@/store/postModule";
import {userModule} from "@/store/userModule";


export default createStore({

    modules: {
      post: postModule,
      login:  userModule
    }
})
