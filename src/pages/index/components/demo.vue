<template>
    <p>This is a demo</p>
</template>

<script>
export default {
}
</script>

<style lang="less">
@import '../../../assets/less/style.less';

@color : red;

p{
    color: @color;
    .text-overflow();
}
</style>
