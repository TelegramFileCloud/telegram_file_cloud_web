import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { mdiMagnify, mdiFolder, mdiFile, mdiPlus, mdiCloudUpload,mdiFolderPlus } from '@mdi/js'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg'
  }
})

export const icon = {
  mdiMagnify,
  mdiFolder,
  mdiFile,
  mdiPlus,
  mdiCloudUpload,
  mdiFolderPlus
}
