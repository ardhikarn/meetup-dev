import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg' || 'md'
  },
  theme: {
    themes: {
      light: {
        primary: colors.indigo.darken4, // #1A237E
        secondary: colors.indigo.lighten4, // #C5CAE9
        accent: colors.red.darken1 // #E53935
      }
    }
  }
})
