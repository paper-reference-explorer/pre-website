<template>
    <div>
        <md-toolbar class="md-accent">
            <div class="md-toolbar-section-start md-title title-wrapper">
                <span>Paper references explorer</span>
            </div>
            <div>
                <Search></Search>
            </div>
            <div class="md-toolbar-section-end">
            </div>
        </md-toolbar>

        <div class="grid-container">
            <div class="graph">
                <Visualization></Visualization>
            </div>
            <div class="info">
                <Info></Info>
            </div>
            <div class="user">
                <User></User>
            </div>
        </div>
    </div>
</template>

<script>
    import Visualization from './components/Visualization.vue';
    import Info from './components/Info.vue';
    import User from './components/User.vue';
    import Search from './components/Search.vue';

    export default {
        name: 'app',
        components: {
            Visualization,
            Info,
            User,
            Search
        },
        data() {
            return {
                initial: null
            }
        },
        methods: {}
    };
</script>

<style type="scss">
    .title-wrapper {
        min-width: calc(320px - 16px) !important;
        max-width: calc(320px - 16px) !important;
        padding: 0 !important;
        margin: 0 !important;
    }
</style>
