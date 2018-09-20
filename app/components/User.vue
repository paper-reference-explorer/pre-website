<template>
    <md-card ref="card">
        <md-card-expand>
            <md-card-actions md-alignment="space-between" class="fake-card-title-wrapper">
                <md-card-header class="fake-card-title-header">
                    <div class="md-title">Added papers</div>
                </md-card-header>

                <md-card-expand-trigger>
                    <md-button class="md-icon-button">
                        <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                </md-card-expand-trigger>
            </md-card-actions>

            <md-card-expand-content>
                <md-card-content>
                    <md-list class="md-double-line">
                        <md-list-item>
                            <div class="md-list-item-text">
                                <span>My paper</span>
                                <p>A et. al.</p>
                            </div>
                            <md-button class="md-icon-button md-list-action">
                                <md-icon>delete</md-icon>
                            </md-button>
                        </md-list-item>
                    </md-list>
                </md-card-content>
            </md-card-expand-content>
        </md-card-expand>
    </md-card>
</template>

<script>
    export default {
        name: "User",
        mounted() {
            this.$refs.card.MdCard.expand = true;
        }
    };
</script>
