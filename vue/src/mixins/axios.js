import axiosM from 'axios'
import { localRoute } from '@/../../config/api.js'
import { refreshJWT } from '@/mixins/refreshJWT.js'

export const axios = {
  mixins: [refreshJWT],
  methods: {
    axiosGET: async function (path, attributes, authorization, refresh) {
      if (refresh && authorization) { await this.refreshToken() }
      var headers
      if (authorization) {
        headers = { headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
          'Accept-Language': window.localStorage.getItem('mnb_lang')
        }}
      } else { headers = { headers: { 'Accept-Language': window.localStorage.getItem('mnb_lang') }} }

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
            'Accept-Language': window.localStorage.getItem('mnb_lang'),
            'Content-Type': 'application/json'
          }
        }
      } else {
        headers = { headers: {
          'Content-Type': 'application/json',
          'Accept-Language': window.localStorage.getItem('mnb_lang')
        }}
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
            'Accept-Language': window.localStorage.getItem('mnb_lang'),
            'Content-Type': 'application/json'
          }
        }
      } else {
        headers = { headers: {
          'Content-Type': 'application/json',
          'Accept-Language': window.localStorage.getItem('mnb_lang')
        }}
      }

      return await axiosM.put(localRoute + '/' + path, body, headers)
    },

    axiosDELETE: async function (path, attributes, authorization, refresh) {
      if (refresh && authorization) { await this.refreshToken() }
      var headers
      if (authorization) {
        headers = { headers: {
          'Authorization': 'Bearer ' + window.localStorage.getItem('mnb_atok'),
          'Accept-Language': window.localStorage.getItem('mnb_lang')
        }}
      } else { headers = { headers: { 'Accept-Language': window.localStorage.getItem('mnb_lang') }} }

      if (attributes !== null) {
        path += '?'
        Object.keys(attributes).forEach(e => { path += e.toString() + '=' + attributes[e].toString() + '&' })
        path = path.slice(0, -1)
      }

      return axiosM.delete(localRoute + '/' + path, headers)
    }

  }
}
