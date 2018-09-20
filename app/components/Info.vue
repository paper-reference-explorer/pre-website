<template>
    <md-card ref="card">
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
    </md-card>
</template>

<script>
    export default {
        name: "Info",
        mounted() {
            this.$refs.card.MdCard.expand = true;
        }
    };
</script>
