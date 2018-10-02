<template>
    <v-autocomplete
        flat
        solo-inverted
        hide-details
        clearable
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
        :loading="loading"
        :items="items"
        item-text="description"
        item-value="paper"
        :search-input.sync="search"
        v-model="select"
        no-filter
        hide-no-data
    ></v-autocomplete>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "Search",
        data: () => ({
            loading: false,
            items: [],
            search: null,
            select: null
        }),
        watch: {
            search(val) {
                if (val && val !== this.select) {
                    this.querySelections(val);
                }
            },
            select(val) {
                if (val) {
                    this.$store.dispatch("addPaper", val);
                    this.select = undefined;
                    this.items = undefined;
                }
            }
        },
        methods: {
            querySelections(query) {
                this.loading = true;
                axios.get('/search', {params: {keyword: query}})
                    .then((response) => {
                        this.items = response.data.papers
                            .map(function (p) {
                                return {
                                    "paper": p,
                                    "description": p.year + " - " + p.authors + " " + p.title
                                }
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .then(() => {
                        this.loading = false;
                    });
            }
        }
    }
</script>

<style scoped>

</style>
