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
                <md-card>
                    <md-card-header>
                        <div class="md-title">Added papers</div>
                    </md-card-header>
                    <md-card-content>
                        <md-list class="md-double-line">
                            <md-list-item>
                                <div class="md-list-item-text">
                                    <span>My paper</span>
                                    <span>A et. al.</span>
                                </div>
                                <md-button class="md-icon-button md-list-action">
                                    <md-icon>delete</md-icon>
                                </md-button>
                            </md-list-item>
                        </md-list>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import Visualization from './components/Visualization.vue';
    import Info from './components/Info.vue';

    export default {
        name: 'app',
        components: {
            Visualization,
            Info
        },
        data() {
            return {
                initial: null
            }
        },
        methods: {}
    };
</script>
