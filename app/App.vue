<template>
    <div class="grid-container">
        <div class="header">
            <h1>Paper references explorer</h1>
        </div>
        <div class="information">
            <h1>Information:</h1>
        </div>
        <div class="user-papers">
        </div>
        <div class="visualization start-cell end-cell">
            <Visualization></Visualization>
        </div>
    </div>
</template>

<script>
    import Visualization from './components/Visualization.vue';

    export default {
        name: 'app',
        components: {
            Visualization
        },
        data() {
            return {}
        },
        methods: {}
    };
</script>
