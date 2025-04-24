<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useDeviceDetection } from '../composables/useDeviceDetection';

export default defineComponent({
    name: 'Home',

    data() {
        return {
            route: useRoute(),
            isDevice: useDeviceDetection(),
            titles: [
                'Lorem\nIpsum Si',
                'Dolor\nSit Amet',
                'Consectetur\nAdipiscing',
                'Elite\nVitae Est'
            ],
            currentTitleIndex: 0,
            intervalId: null,
            displayedText: '',
            isAnimatingOut: false
        }
    },

    methods: {
        async animateText(text, isOut = false) {
            const chars = text.split('');
            if (isOut) {
                // Animate out (right to left)
                for (let i = chars.length - 1; i >= 0; i--) {
                    this.displayedText = chars.slice(0, i + 1).join('');
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            } else {
                // Animate in (left to right)
                for (let i = 0; i < chars.length; i++) {
                    this.displayedText = chars.slice(0, i + 1).join('');
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
        },

        async titleChange() {
            // First animation out
            await this.animateText(this.titles[this.currentTitleIndex], true);

            // Change index
            this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;

            // Then animate in
            await this.animateText(this.titles[this.currentTitleIndex]);

            // Schedule next change
            this.intervalId = setTimeout(() => {
                this.titleChange();
            }, 2000); // Wait time between animations
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.displayedText = this.titles[0];
            this.titleChange();
        });
    },

    beforeUnmount() {
        if (this.intervalId) {
            clearTimeout(this.intervalId);
        }
    }
})
</script>

<template>
    <div v-if="isDevice === 'mb'" :class="`page-container ${route.name}-container .content-${isDevice}`">
        <h1>Homepage Mobile</h1>
    </div>

    <div v-if="isDevice === 'pc'" :class="`page-container ${route.name}-container content-${isDevice}`">
        <div class="main-title" v-html="displayedText.replace(/\n/g, '<br>')"></div>
    </div>
</template>

<style scoped lang="sass">
.content-mb
    position: relative

.content-pc
    position: relative
    .main-title
        font-size: 200px
        font-family: 'SpaceMono Nerd Font', sans-serif
        position: absolute
        left: 2vw
        bottom: 2vw
        white-space: pre-line
        &::after
            content: '_'
            animation: blink 1s infinite

@keyframes blink
    0%, 100%
        opacity: 1
    50%
        opacity: 0
</style>