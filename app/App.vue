<template>
    <div>
        <md-toolbar class="md-primary">
            <span class="md-title">Paper references explorer</span>
            <Search></Search>
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
