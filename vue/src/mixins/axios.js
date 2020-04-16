import axiosM from 'axios'
import { localRoute } from '@/../../configuration/config.js'
import { refreshJWT } from '@/mixins/refreshJWT.js'

export const axios = {
  mixins: [refreshJWT],
  methods: {
    axiosGET: async function (path, attributes, authorization, refresh) {
      if (refresh && authorization) { await this.refreshToken() }
      var headers
      if (authorization) {
        headers = { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok') }}
      } else { headers = null }

      if (attributes !== null) {
        path += '?'
        Object.keys(attributes).forEach(e => { path += e.toString() + '=' + attributes[e].toString() + '&' })
        path = path.slice(0, -1)
      }

      return axiosM.get(localRoute + '/' + path, headers)
    },

    axiosPOST: async function (path, body, authorization, refresh) {
      if (refresh && authorization) { await this.refreshToken() }
      var headers
      if (authorization) {
        headers = {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
            'Content-Type': 'application/json'
          }
        }
      } else {
        headers = { headers: { 'Content-Type': 'application/json' }}
      }

      return await axiosM.post(localRoute + '/' + path, body, headers)
    },

    axiosPUT: async function (path, body, authorization, refresh) {
      if (refresh && authorization) { await this.refreshToken() }
      var headers
      if (authorization) {
        headers = {
          headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
            'Content-Type': 'application/json'
          }
        }
      } else {
        headers = { headers: { 'Content-Type': 'application/json' }}
      }

      return await axiosM.put(localRoute + '/' + path, body, headers)
    },

    axiosDELETE: async function (path, attributes, authorization, refresh) {
      if (refresh && authorization) { await this.refreshToken() }
      var headers
      if (authorization) {
        headers = { headers: { 'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok') }}
      } else { headers = null }

      if (attributes !== null) {
        path += '?'
        Object.keys(attributes).forEach(e => { path += e.toString() + '=' + attributes[e].toString() + '&' })
        path = path.slice(0, -1)
      }

      return axiosM.delete(localRoute + '/' + path, headers)
    }

  }
}
