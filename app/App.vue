<template>
    <v-app id="inspire">
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            fixed
            app
            width="326"
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
                <template v-for="item in addedPapers">
                    <v-hover close-delay="0">
                        <v-list-tile :key="item.title" @click="" slot-scope="{ hover }">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    {{ item["date-created"].substring(0, 4) }} - {{ item.authors }}
                                </v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>

                                <v-btn icon v-if="hover">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                    </v-hover>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="blue darken-3"
            dark
            app
            fixed
        >
            <v-toolbar-title>
                <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <span class="hidden-sm-and-down">Paper references explorer</span>
            </v-toolbar-title>

            <v-text-field
                flat
                solo-inverted
                hide-details
                clearable
                prepend-inner-icon="search"
                label="Search"
                class="hidden-sm-and-down"
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn icon @click="dialog = !dialog">
                <v-icon>help</v-icon>
            </v-btn>
        </v-toolbar>

        <v-content>
            <v-container>
                <Visualization></Visualization>
            </v-container>
        </v-content>

        <v-dialog v-model="dialog" width="800px">
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
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
    import Visualization from './components/Visualization.vue';

    export default {
        components: {
            Visualization
        },
        data: () => ({
            dialog: false,
            drawer: null,
            addedPapers: [
                {"authors": "A et al.", "title": "My first paper", "date-created": "2018-09-01"},
                {"authors": "B et al.", "title": "Friendly paper", "date-created": "2018-04-23"},
                {"authors": "C et al.", "title": "Another friendly paper", "date-created": "2016-12-05"}
            ]
        }),
        props: {
            source: String
        }
    }
</script>

<style>
    .v-toolbar__content {
        /* (6 + 12) (button margin) + 8 (icon specific margin) - 20 (icons should start at) = 6 */
        padding: 0 20px 0 6px !important;
    }

    .v-toolbar__title {
        width: 320px !important;
    }

    .v-list__tile {
        padding: 0 20px !important; /* icons should start at 20 */
    }

    .information {
        padding: 0 20px;
    }
</style>
