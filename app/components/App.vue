<template>
    <v-app id="inspire">
        <Drawer></Drawer>

        <v-toolbar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            color="blue darken-3"
            dark
            app
            fixed
        >
            <v-toolbar-title>
                <v-toolbar-side-icon @click.stop="$store.dispatch('toggleDrawerStatus')"></v-toolbar-side-icon>
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

            <v-btn icon @click="$store.dispatch('openAbout')">
                <v-icon>help</v-icon>
            </v-btn>
        </v-toolbar>

        <v-content>
            <v-container>
                <Visualization></Visualization>
            </v-container>
        </v-content>

        <About
            ref="about"
        >
        </About>
    </v-app>
</template>

<script>
    import Visualization from './Visualization.vue';
    import Drawer from "./Drawer.vue";
    import About from "./About.vue";

    export default {
        components: {
            About,
            Drawer,
            Visualization
        },
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
