import axios from 'axios'
import { localRoute } from '@/../../configuration/config.js'
export const refreshJWT = {
  methods: {
    refreshToken: async function () {
      if (!window.localStorage.getItem('mnb_rtok')) { return }
      await axios
        .post(localRoute + '/api/users/refresh', {
          token: window.localStorage.getItem('mnb_rtok')
        })
        .then(response => {
          window.localStorage.setItem('mnb_atok', response.data.accessToken)
        })
        .catch(err => {
          switch (err.response.status) {
            case 403:
            case 500:
            default:
              this.$log.error(err)
          }
        })
    }
  }
}
