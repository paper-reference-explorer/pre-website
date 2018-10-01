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
            <v-subheader>Added papers</v-subheader>
            <template v-for="(paper, index) in this.addedPapers">
                <v-hover close-delay="0">
                    <v-list-tile :key="paper.title" slot-scope="{ hover }">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ paper.title }}</v-list-tile-title>
                            <v-list-tile-sub-title>
                                {{ paper["date-created"].substring(0, 4) }} - {{ paper.authors }}
                            </v-list-tile-sub-title>
                        </v-list-tile-content>

                        <v-list-tile-action>

                            <v-btn icon v-if="hover" @click="deletePaper(index)">
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
            addedPapers() {
                return this.$store.state.addedPapers
            }
        },
        data: () => ({
            isOpen: true
        }),
        methods: {
            deletePaper: function (index) {
                this.$store.dispatch("removePaper", index);
            },
            toggleOpened: function () {
                this.isOpen = !this.isOpen;
            }
        }
    }
</script>

<style scoped>

</style>
