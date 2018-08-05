import axios from 'axios'
import Vue from 'vue'

let instence = axios.create({
  baseURL:process.env.NODE_ENV == 'development'? '/api':'/'
})

Vue.prototype.$axios = instence;
