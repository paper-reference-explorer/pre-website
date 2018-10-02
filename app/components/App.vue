<template>
    <v-app id="inspire">
        <Drawer></Drawer>

        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="blue darken-3"
            dark
            app
            fixed
            extended
            :extension-height="extensionHeight"
        >
            <v-toolbar-title>
                <v-toolbar-side-icon
                    @click.stop="$store.dispatch('toggleDrawerStatus')"
                ></v-toolbar-side-icon>
                <span
                    class="hidden-sm-and-down"
                >
                    Paper references explorer
                </span>
            </v-toolbar-title>

            <Search></Search>

            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="$store.dispatch('openAbout')"
            >
                <v-icon>help</v-icon>
            </v-btn>

            <v-progress-linear
                v-show="$store.state.isWaitingForGraph"
                slot="extension"
                :indeterminate="true"
                :height="extensionHeight"
                color="accent"
            ></v-progress-linear>
        </v-toolbar>

        <v-content>
            <v-container
                v-show="$store.state.graphPapers.length === 0"
                fluid
                fill-height
            >
                <v-layout
                    align-center
                    justify-center
                    column
                >
                    <p class="font-weight-light display-1 text-xs-center">Search for some papers to get started</p>

                    <p class="font-weight-light title">or</p>

                    <v-btn
                        color="primary"
                        @click="$store.dispatch('loadExample')"
                    >
                        view example
                    </v-btn>
                </v-layout>
            </v-container>

            <v-container
                v-show="$store.state.graphPapers.length > 0"
                fill-height
            >
                <v-layout
                    align-center
                    justify-center
                    column
                >
                    <Visualization></Visualization>
                </v-layout>
            </v-container>
        </v-content>

        <About></About>
    </v-app>
</template>

<script>
    import Visualization from './Visualization.vue';
    import Drawer from "./Drawer.vue";
    import About from "./About.vue";
    import Search from "./Search.vue";

    export default {
        components: {
            About,
            Drawer,
            Search,
            Visualization
        },
        props: {
            source: String
        },
        data: () => ({
            extensionHeight: 4
        })
    }
</script>

<style>
    .v-toolbar__content {
        /* extensionHeight (top)
        /* (6 + 12) (button margin) + 8 (icon specific margin) - 20 (icons should start at) = 6 (left)*/
        padding: 4px 20px 0 6px !important;
    }

    .v-toolbar__title {
        width: 320px !important;
    }

    .v-toolbar__extension {
        padding: 0 !important;
    }

    .v-list__tile {
        padding: 0 20px !important; /* icons should start at 20 */
    }

    .information {
        padding: 0 20px;
    }
</style>
