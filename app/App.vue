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
                        <md-card-actions md-alignment="space-between" class="fake-card-title-wrapper">
                            <md-card-header class="fake-card-title-header">
                                <div class="md-title">Information</div>
                            </md-card-header>

                            <md-card-expand-trigger>
                                <md-button class="md-icon-button">
                                    <md-icon>keyboard_arrow_down</md-icon>
                                </md-button>
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
                    <md-card-content>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea,
                        nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas,
                        saepe voluptate pariatur in deleniti minus sint. Excepturi.
                    </md-card-content>
                </md-card>
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
