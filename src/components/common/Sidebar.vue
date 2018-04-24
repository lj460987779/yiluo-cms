<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    // {
                    //     icon: 'el-icon-setting',
                    //     index: 'readme',
                    //     title: '自述'
                    // },
                    // {
                    //     icon: 'el-icon-star-on',
                    //     index: 'authority',
                    //     title: '权限管理'
                    // },
                    {
                        icon: 'el-icon-menu',
                        index: 'news',
                        title: '新闻管理'
                    }
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: 'users',
                    //     title: '用户账号'
                    // }
                    // {
                    //     icon: 'el-icon-menu',
                    //     index: 'test',
                    //     title: '支付测试'
                    // }
                    // },
                    // {
                    //     icon: 'el-icon-delete',
                    //     index: 'recycle',
                    //     title: '回收站'
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
