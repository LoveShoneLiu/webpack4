<template>
    <div>  
        <button class="btn" v-on:click="show = !show">
            Toggle
        </button>
        <transition class="trans" name="fade">
            <p v-if="show">hello</p>
        </transition>
    </div>
</template>
<script>
    import axios from 'axios';
    import qs from 'qs';
    export default ({
        data() {
            return {
                show: true
            }
        }
    })
</script>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
    .btn {
        width: 100px;
        height: 100px;
    }
    .trans {
        width: 100px;
        height: 100px;
    }
</style>