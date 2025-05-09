<script setup>

</script>

<template>
    <nav class="nav-container">
        <router-link to="/">Home</router-link>
        <router-link to="/projects">Project</router-link>
    </nav>
</template>

<style scoped lang="sass">
nav
    padding-right: 30px
    display: flex
    flex-direction: column
    gap: 10px
    width: 100px
    text-align: end
    position: fixed
    right: 0
    top: 50%
    z-index: 9999
    a
        text-decoration: none
        font-size: 1.1rem
        transition: color 0.3s ease
    a.router-link-exact-active
        color: inherit
    a:hover
        color: #42b983

</style>