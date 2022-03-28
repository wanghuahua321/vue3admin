import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import SvgIcon from '@/components/svg-icon/index.vue';
// import axios from 'axios';

import "lib-flexible/flexible"

import "./assets/aliicon/iconfont.css"
import VueCookies  from 'vue-cookies'

const app =createApp(App)

app.use(store).use(router).use(antd).mount('#app')

app.component('svg-icon', SvgIcon) // 全局注册组件

app.provide('$cookies',VueCookies)