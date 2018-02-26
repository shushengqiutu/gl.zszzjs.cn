<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'SchoolInfo',
        components:{Breadcrumb},
        data () {
            return {
                location:'学校学情统计'
            }
        }
    }
</script>
