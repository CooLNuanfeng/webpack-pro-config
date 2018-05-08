<template>
    <div>
        <div><img src="@/assets/images/logo.png" alt=""></div>
        <button @click="load">按需加载</button>
        <div class="bg"></div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {

        }
    },
    methods : {
        load(){
            import(/* webpackChunkName: "load" */ '../src/load.js');
        }
    }
}
</script>

<style lang="less">
@import '~#/common-minx.less';
@import '../../../assets/less/style.less';
@color : red;

p{
    color: @color;
    color: @blue;
    flex: 1;

}
.bg{
    width: 150px;
    height: 100px;
    background-size: cover;
    background: url('~@/assets/images/pic.jpg');
}
</style>
