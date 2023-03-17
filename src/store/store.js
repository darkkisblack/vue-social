import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import popularTags from '@/store/modules/popularTags'

const store = createStore({
    state () {
      return {
        count: 0
      }
    },
    mutations: {
    },
    actions: {

    },
    modules: {
        auth,
        feed,
        popularTags
    }
  })

  export default store