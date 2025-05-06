import { ref } from 'vue'

const theme = ref('dark-theme')

export function useTheme() {
	const toggleTheme = () => {
		theme.value = theme.value === 'dark-theme' ? 'light-theme' : 'dark-theme'
		document.documentElement.className = theme.value
	}
	
	const initTheme = () => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
		theme.value = prefersDark ? 'dark-theme' : 'light-theme'
		document.documentElement.className = theme.value
	}
	
	return {
		theme,
		toggleTheme,
		initTheme
	}
}