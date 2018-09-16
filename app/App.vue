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
                <md-card>
                    <md-card-expand>
                        <md-card-actions md-alignment="left">
                            <md-card-expand-trigger>
                                <md-button style="width: 100%;">Information</md-button>
                            </md-card-expand-trigger>
                        </md-card-actions>

                        <md-card-expand-content>
                            <md-card-content>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea,
                                nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas,
                                saepe voluptate pariatur in deleniti minus sint. Excepturi.
                            </md-card-content>
                        </md-card-expand-content>
                    </md-card-expand>
                </md-card>
            </div>
            <div class="user"> 
            </div>
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
            return {
                initial: null
            }
        },
        methods: {}
    };
</script>
