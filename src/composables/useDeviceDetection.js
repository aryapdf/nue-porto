import { ref, onMounted, onUnmounted } from 'vue';

export function useDeviceDetection(breakpoint = 768) {
	const isDevice = ref('pc');
	
	const detectDevice = () => {
		const width = window.innerWidth;
		isDevice.value = width < breakpoint ? 'mb' : 'pc';
	};
	
	onMounted(() => {
		detectDevice();
		window.addEventListener('resize', detectDevice);
	});
	
	onUnmounted(() => {
		window.removeEventListener('resize', detectDevice);
	});
	
	return isDevice;
}