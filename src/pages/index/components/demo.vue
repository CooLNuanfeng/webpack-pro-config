<template>
    <div>
        <div><img src="@/assets/images/logo.png" alt=""></div>
        <button @click="load">按需加载</button>
        <div class="icon">
            <svg>
                <use xlink:href="#star" />
            </svg>
        </div>
        <div class="icon">
            <svg>
                <use xlink:href="#user" />
            </svg>
        </div>
        <div class="icon">
            <svg>
                <use xlink:href="#store" />
            </svg>
        </div>
        <div class="bg"></div>
        <ul id="ul">
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
import star from '@/assets/images/star.svg';
import store from '@/assets/images/store.svg';
import user from '@/assets/images/user.svg';

export default {
    name: 'Demo',
    data: function(){
        return {
            lists: []
        }
    },
    methods : {
        load(){
            import(/* webpackChunkName: "load" */ '../src/load.js');
        }
    },
    mounted(){
        this.lists = Array.from(new Set(['a','b','c','d']));
        // console.log(_.head(this.lists)); //lodash test
        console.log($('.flex').html());

    }
}
</script>

<style lang="scss">

@import '@/assets/sass/style.scss';
@import '~#/_common-mixin.scss';

div{
    transform: scale(.9);
}
h4{
    display: flex;
    flex-direction: column;
}
.icon{
    display: inline-block;
    width: 60px;
    height: 60px;
    svg{
        width: 100%;
        height: 100%;
    }
}
.linear{
    height: 30px;
    animation: change 3s linear;
    @include text-mutiplue-overflow();
    @include linear-gradient(#ff0000,#ff00ff);
}
@keyframes change {
    0%{
        color: #ff0000;
    }
    100%{
        color: #ffffff;
    }
}

.bg{
    width: 150px;
    height: 100px;
    background-size: cover;
    background: url('~@/assets/images/pic.jpg');
}
</style>
