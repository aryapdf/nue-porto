<script setup>
import Navigation from "./components/Navigation.vue";
import { useTheme } from "./composables/useTheme.js";
import {onMounted} from "vue";

const { initTheme } = useTheme();

onMounted(() => {
    initTheme();
})
</script>

<template>
    <Navigation />
    <router-view/>
</template>
