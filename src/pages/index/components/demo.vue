<template>
    <p>This is a demo</p>
</template>

<script>
export default {
}
</script>

<style lang="less">
@import '../../../assets/less/style.less';
@import '../../../../raw/common-minx.less';
@color : red;

p{
    color: @color;
    color: @blue;
    .text-overflow();
}
</style>
