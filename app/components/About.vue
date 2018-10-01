<template>
    <v-dialog v-model="isOpen" width="800px">
        <v-card>
            <v-card-title
                class="headline primary white--text"
                primary-title
            >
                About
            </v-card-title>

            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea,
                nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas,
                saepe voluptate pariatur in deleniti minus sint. Excepturi.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    flat
                    @click="isOpen = false"
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "About",
        computed: {
            isOpen: {
                get: function () {
                    return this.$store.state.isAboutVisible;
                },
                set: function (newValue) {
                    this.$store.dispatch("setAboutStatus", newValue);
                }
            }
        }
    }
</script>

<style scoped>

</style>
