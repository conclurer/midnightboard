import axios from 'axios'
import { localRoute } from '@/../../configuration/config.js'
export const logoutUser = {
  methods: {
    logout: async function () {
      axios
        .delete(localRoute + '/api/users/logout', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          window.localStorage.clear()
          this.$router.push({ name: 'Login' })
        })
        .catch(err => {
          switch (err.response.status) {
            case 401:
            case 400:
            case 500:
            default:
              this.$log.error(err)
          }
        })
    }
  }
}
