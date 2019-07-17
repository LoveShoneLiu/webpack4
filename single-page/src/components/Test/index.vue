<template>
    <div>
        <button @click="clickHandler">按钮</button>
        <span v-show="isShow">是否显示</span>
    </div>
</template>

<script>
export default {
    data() {
        return  {
            isShow: false
        }
    },
    methods: {
        clickHandler() {
            this.isShow = !this.isShow;
        }
    }
}
</script>

<style>

</style>
