<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'WsInfo',
        components:{Breadcrumb},
        data () {
            return {
                location:'工作坊学情统计'
            }
        }
    }
</script>
