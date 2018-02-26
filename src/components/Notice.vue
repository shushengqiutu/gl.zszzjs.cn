<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';
    export default {
        name: 'Notice',
        components:{Breadcrumb},
        data () {
            return {
                location:'公告管理'
            }
        }
    }
</script>
