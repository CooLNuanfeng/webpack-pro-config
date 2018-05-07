<template>
    <div>
        <p>This is a demo</p>
        <button @click="load">按需加载</button>
    </div>
</template>

<script>
export default {
    methods : {
        load(){
            // import(/* webpackChunkName: "load" */ '../src/load.js');
        }
    }
}
</script>

<style lang="less">
@import '../../../assets/less/style.less';
@import '~#/common-minx.less';
@color : red;

p{
    color: @color;
    color: @blue;
    .text-overflow();
}
</style>
