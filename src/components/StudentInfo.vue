<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'StudentInfo',
        components:{Breadcrumb},
        data () {
            return {
                location:'学员学情统计'
            }
        }
    }
</script>

