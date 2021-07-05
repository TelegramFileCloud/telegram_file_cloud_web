import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { mdiMagnify } from '@mdi/js'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg'
  }
})

export const icon = {
  mdiMagnify
}
