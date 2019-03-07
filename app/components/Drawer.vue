<template>
    <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        fixed
        app
        width="326"
        v-model="isOpen"
    > <!-- 320 (title width) + 6 (toolbar padding) = 326 -->
        <v-subheader>Information</v-subheader>
        <Information></Information>

        <v-divider></v-divider>

        <v-list
            subheader
            two-line
        >
            <v-subheader>
                <span
                    v-show="this.hasPapers"
                >
                    Added papers
                </span>
                <span
                    v-show="!this.hasPapers"
                >
                    No papers added yet
                </span>

                <v-spacer></v-spacer>

                <v-btn
                    flat
                    small
                    @click="$store.dispatch('removeAllPapers')"
                    :disabled="!this.hasPapers"
                >
                    Delete all
                </v-btn>
            </v-subheader>

            <template
                v-for="(paper, index) in this.addedPapers"
            >
                <v-hover
                    close-delay="0"
                >
                    <v-list-tile
                        :key="paper.title"
                        slot-scope="{ hover }"
                        @click=""
                        @mouseenter="$store.dispatch('setHover', paper.key)"
                        @mouseleave="$store.dispatch('removeHover', paper.key)"
                    >
                        <!-- @click is needed for gray hover effect -->
                        <v-list-tile-content>
                            <v-list-tile-title>{{ paper.title }}</v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{ paper.year }} - {{ paper.authors }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-btn
                                v-if="hover"
                                icon
                                @click="$store.dispatch('removePaper', index)"
                            >
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
    import Information from "./Information.vue";

    export default {
        name: "Drawer",
        components: {Information},
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
            },
            hasPapers() {
                return this.$store.state.addedPapers.length > 0;
            }
        }
    }
</script>

<style scoped>
</style>
