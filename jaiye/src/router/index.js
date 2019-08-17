import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/user/index'
import Login from '@/components/admin/login'
import Home from '@/components/user/homepage'
import Admin from '@/components/admin/index'
import Dashboard from '@/components/admin/dashboard'
import events from '@/components/admin/events';
import CreateEvent from '@/components/admin/new-event/index.vue'
import Step1 from '@/components/admin/new-event/step1'
import Step2 from '@/components/admin/new-event/step2'
import Step3 from '@/components/admin/new-event/step3'
import CreateListing from '@/components/admin/create-listing/index'
import CreateAttraction from '@/components/admin/create-attraction/index'
import CreateListingStep1 from '@/components/admin/create-listing/step1'
import CreateAttractionStep1 from '@/components/admin/create-attraction/step1'
import Listing from '@/components/admin/listings'
import Attractions from '@/components/admin/attractions'
import Complaints from '@/components/admin/complaints'
import Ads from '@/components/admin/ads'
import Users from '@/components/admin/users'
import CreateUser from '@/components/admin/create-user'
import ViewUser from '@/components/admin/view-user'
import Blogs from '@/components/admin/blogs'
import CreateBlog from '@/components/admin/blog/index'
import CreateBlogStep1 from '@/components/admin/blog/step1'
import CreateAd from '@/components/admin/create-ad/index'
import CreateAdStep1 from '@/components/admin/create-ad/step1'
import BestThings from '@/components/admin/bestthings'
import {AdminGaurd} from "@/helpers/router-gaurd"

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:Admin,
      beforeEnter:AdminGaurd,
      children:[
        {
          path:'/',
          component:Dashboard
        },
        {
          path:'/event',
          name:'event',
          component:events
        },
        {
          path:'/event/create',
          component:CreateEvent,
          children:[
            {
              path:"/",
              component:Step1
            },
            {
              path:"/event/create/step2",
              component:Step2
            },
            {
              path:"/event/create/step3",
              component:Step3
            },
          ]
        },
        {
          path:'/listing',
          name:'listing',
          component:Listing
        },
        {
          path:'/complaints',
          name:'complaints',
          component:Complaints
        },
        {
          path:'/listing/create',
          component:CreateListing,
          children:[
            {
              path:"/",
              component:CreateListingStep1
            }
          ]
        },
        {
          path:'/attraction',
          name:'attraction',
          component:Attractions
        },
        {
          path:'/attraction/create',
          component:CreateAttraction,
          children:[
            {
              path:"/",
              component:CreateAttractionStep1
            }
          ]
        },
        {
          path:'/ad',
          name:'ad',
          component:Ads
        },
        {
          path:'/users',
          name:'user',
          component:Users
        },
        {
          path:'/users/create',
          name:'create-user',
          component:CreateUser
        },
        {
          path:'/users/view',
          name:'create-user',
          component:ViewUser
        },
        {
          path:'/ad/create',
          component:CreateAd,
          children:[
            {
              path:"/",
              component:CreateAdStep1
            }
          ]
        },
        {
          path:'/blog',
          name:'blog',
          component:Blogs
        },
        {
          path:'/complaints',
          name:'complaints',
          component:Complaints
        },
        {
          path:'/blog/create',
          component:CreateBlog,
          children:[
            {
              path:"/",
              component:CreateBlogStep1
            }
          ]
        },
        {
          path:'/bestthings',
          component:BestThings,
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to,from)
  next()
})
export default router

