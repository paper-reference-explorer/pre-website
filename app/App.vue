<template>
    <div>
        <md-toolbar>
            <span class="md-title">Paper references explorer</span>
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

    export default {
        name: 'app',
        components: {
            Visualization,
            Info,
            User
        },
        data() {
            return {
                initial: null
            }
        },
        methods: {}
    };
</script>
