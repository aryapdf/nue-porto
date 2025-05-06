<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useDeviceDetection } from '../composables/useDeviceDetection';
import { useTheme } from '../composables/useTheme';

export default defineComponent({
    name: 'Home',

    setup() {
        const { theme, toggleTheme } = useTheme();

        return {
            theme,
            toggleTheme
        }
    },

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
        },

        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme;
            // You can implement the actual theme switching logic here
            document.body.classList.toggle('dark-theme');
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
        <div class="container navbar-container">
            <nav class="navbar">
                <div class="nav-brand">
                    <h1>Your Name</h1>
                </div>
                <div class="nav-links">
                    <router-link to="/" class="nav-link">Home</router-link>
                    <router-link to="/projects" class="nav-link">Projects</router-link>
                    <router-link to="/about" class="nav-link">About</router-link>
                </div>
                <div class="theme-toggle">
                    <button @click="toggleTheme">
                        <span v-if="theme === 'dark-theme'">🌞</span>
                        <span v-else>🌙</span>
                    </button>
                </div>
            </nav>
        </div>
        <div class="container jumbotron">
            <div class="main-title" v-html="displayedText.replace(/\n/g, '<br>')"></div>
        </div>
    </div>
</template>

<style scoped lang="sass">
.content-mb
    position: relative

.content-pc
    position: relative
    .navbar-container
        position: absolute
        width: 100vw
        top: 0
        left: 0
        .navbar
            display: flex
            justify-content: space-between
            width: 100vw
            align-items: center
            padding: 1vw 2vw
            position: relative
            top: 0
            left: 0
            right: 0
            z-index: 1000

            .nav-brand
                h1
                    font-size: 1.5rem
                    margin: 0
                    font-family: 'SpaceMono Nerd Font', sans-serif

            .nav-links
                display: flex
                gap: 2rem
                align-items: center

                .nav-link
                    text-decoration: none
                    color: inherit
                    font-size: 1.1rem
                    transition: color 0.3s ease
                    &:hover
                        color: #666

            .theme-toggle
                position: relative
                button
                    background: none
                    border: none
                    cursor: pointer
                    font-size: 1.5rem
                    padding: 0.5rem
                    transition: transform 0.3s ease
                    &:hover
                        transform: scale(1.1)
    .jumbotron
        width: 100vw
        height: 100vh
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