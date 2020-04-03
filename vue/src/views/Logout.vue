<script>
import axios from 'axios'

export default {
  name: 'NoticeBoard',
  created () {
    this.logout()
  },
  methods: {
    logout () {
      axios
        .delete('http://localhost:1337/api/users/logout', {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok')
          }
        })
        .then(response => {
          window.localStorage.clear()
          window.location = '/login'
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

</script>
