import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Project from '../pages/Project.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/projects',
		name: 'projects',
		component: Project
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router