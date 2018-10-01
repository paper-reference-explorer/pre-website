<template>
    <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        fixed
        app
        width="326"
        v-bind:value="value"
        v-on:value="$emit('value', $event.target.value)"
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
            <template v-for="(paper, index) in addedPapers">
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
        props: [
            "value"
        ],
        data: () => ({
            addedPapers: [
                {"authors": "A et al.", "title": "My first paper", "date-created": "2018-09-01"},
                {"authors": "B et al.", "title": "Friendly paper", "date-created": "2018-04-23"},
                {"authors": "C et al.", "title": "Another friendly paper", "date-created": "2016-12-05"}
            ]
        }),
        methods: {
            deletePaper: function (index) {
                this.$delete(this.addedPapers, index);
            }
        }
    }
</script>

<style scoped>

</style>
