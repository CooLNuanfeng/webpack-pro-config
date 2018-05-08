<template>
    <div>
        <h1>{{msg}}</h1>
        <v-demo></v-demo>
        <ul>
            <li v-for="item in lists">{{item}}</li>
        </ul>
        <h4 class="flex">
            <p>flex</p>
            <p>style</p>
        </h4>
        <div class="linear">linear-gradient</div>
    </div>
</template>

<script>
import Demo from './components/demo.vue';
import $ from 'jquery';

export default {
    data(){
        return {
            msg : 'Hello vue!',
            lists : []
        }
    },
    components : {
        'v-demo' : Demo
    },
    mounted(){
        this.lists = Array.from(new Set(['a','b','c','d']));
        // console.log(_.head(this.lists)); //lodash test
        console.log($('.flex').html());
    }
}
</script>

<style lang="scss">
@import '../../assets/sass/style.scss';
div{
    transform: scale(.9);
}
h4{
    display: flex;
    flex-direction: column;
}
.linear{
    height: 30px;
    color: #fff;
    @include linear-gradient(#ff0000,#ff00ff);
}
</style>
