<template>
    <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        fixed
        app
        width="326"
        v-model="isOpen"
    > <!-- 320 (title width) + 6 (toolbar padding) = 326 -->
        <v-subheader>Information</v-subheader>
        <p class="information">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea,
            nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas,
            saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </p>

        <v-divider></v-divider>

        <v-list subheader two-line>
            <v-subheader>
                <span>Added papers</span>

                <v-spacer></v-spacer>

                <v-btn
                    flat
                    small
                >
                    Delete all
                </v-btn>
            </v-subheader>

            <template v-for="(paper, index) in this.addedPapers">
                <v-hover close-delay="0">
                    <v-list-tile :key="paper.title" slot-scope="{ hover }">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ paper.title }}</v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{ paper.year }} - {{ paper.authors }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>

                            <v-btn icon v-if="hover" @click="$store.dispatch('removePaper', index)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-hover>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Drawer",
        computed: {
            isOpen: {
                get: function () {
                    return this.$store.state.isDrawerOpen;
                },
                set: function (newValue) {
                    this.$store.dispatch("setDrawerStatus", newValue);
                }
            },
            addedPapers() {
                return this.$store.state.addedPapers;
            }
        }
    }
</script>

<style scoped>

</style>
