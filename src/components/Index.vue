<template>
    <div class="content">
        <Breadcrumb :location="location"></Breadcrumb>
    </div>
</template>

<script>
    import Breadcrumb from './Breadcrumb';
    import http from '../lib/http'
    export default {
        name: 'Index',
        components:{Breadcrumb},
        data () {
            return {
                location:'',
            }
        },
        mounted(){
        },

    }
</script>
