<template>
    <div id="app">
        <h1>{{msg}}</h1>
        <router-link to="/login">Go to login</router-link>
        <router-link to="/">Go to index</router-link>
        <router-view/>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msg : 'Hello vue!'
        }
    }
}
</script>

<style lang="scss">

</style>
