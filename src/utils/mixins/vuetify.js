import { icon } from '@/plugins/vuetify'

export default {
  data: () => ({
    icon: icon
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.isDark
    },
    breakpoint() {
      return this.$vuetify.breakpoint
    }
  }
}
