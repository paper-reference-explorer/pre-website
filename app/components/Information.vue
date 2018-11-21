<template>
    <p class="information">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea,
        nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas,
        saepe voluptate pariatur in deleniti minus sint. Excepturi.
    </p>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "Information",
        computed: mapState(["minimumReferencedGlobal", "maximumReferencedGlobal",
            "minimumReferencedGlobal", "maximumReferencedGlobal",
            "radiusScale", "shadowColorScale", "shadowColorScale"])
    }
</script>

<style scoped>

</style>
