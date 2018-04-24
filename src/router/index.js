import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/401',
            component: resolve => require(['../components/pages/401.vue'], resolve),
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/common/Readme.vue'], resolve)
                },
                {
                    path: '/news',
                    component: resolve => require(['../components/pages/news/index.vue'], resolve),
                    children:[
                         {
                            path: '/',
                            component: resolve => require(['../components/pages/news/News_list.vue'], resolve)
                        },
                        {
                            path: '/news_add',
                            component: resolve => require(['../components/pages/news/News_add.vue'], resolve)
                        },
                    ]
                },
                {
                    path: '/users',
                    component: resolve => require(['../components/pages/users/index.vue'], resolve),
                    children:[
                        {
                            path: '/',
                            component: resolve => require(['../components/pages/users/Users_list.vue'], resolve)
                        },
                        {
                            path: '/users_edit',
                            component: resolve => require(['../components/pages/users/Users_edit.vue'], resolve)
                        },
                    ]
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/common/Login.vue'], resolve)
        },
    ]
})
