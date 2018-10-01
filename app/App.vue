<template>
    <v-app id="inspire">
        <Drawer
            v-model="drawer"
        >
        </Drawer>

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
    import Drawer from "./components/Drawer.vue";

    export default {
        components: {
            Drawer,
            Visualization
        },
        data: () => ({
            dialog: false,
            drawer: true
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
