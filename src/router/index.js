import Vue from 'vue'
import Router from 'vue-router'
import shouye from '../view/shouye'
import rejiste from '../view/rejiste'
import writenote from '../view/writenote'
import detail from '../view/detail'
import schlist from '../view/schlist'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/shouye'},
    {path:'/shouye',name:'shouye',component:shouye},
    {path:'/rejiste',name:'rejiste',component:rejiste},
    {path:'/writenote',name:'writenote',component:writenote},
    {path:'/detail',name:'detail',component:detail},
    {path:'/schlist',name:'schlist',component:schlist},
  ]
})
