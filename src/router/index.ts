import { LoadingBar } from 'view-ui-plus'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach(() => { 
    LoadingBar.finish()
})

export default router