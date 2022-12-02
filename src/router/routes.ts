import Home from '@/views/Home.vue'
import News from '@/views/News/News.vue'
import NewsInfo from '@/views/News/NewsInfo.vue'
import FAQ from '@/views/FAQ.vue'

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {title: 'Home'},
    },
    {
        path: '/news/:nid',
        components: News,
        children: [
        {
        path: '',
        name: 'newsInfo',
        component: NewsInfo,
        meta: { title: 'News' },
        }
    ],
    },
    {
        path: '/faq',
        name: 'faq',
        component: FAQ,
        meta: { title: 'FAQ' },
    },
]