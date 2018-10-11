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
                var parameters = {
                    "search_request": {
                        "query": {
                            "query": query
                        },
                        "size": 10,
                        "from": 0,
                        "fields": [
                            "*"
                        ],
                        "sort": [
                            "-_score"
                        ],
                        "facets": {},
                        "highlight": {}
                    }
                };

                axios.post('/rest/_search', parameters)
                    .then((response) => {
                        var papers = response.data.search_result.hits;
                        this.items = papers.map(function (p) {
                            return {
                                "paper": {
                                    "key": p.id,
                                    "year": p.fields.year,
                                    "authors": p.fields.authors,
                                    "title": p.fields.title
                                },
                                "description": p.fields.year + " - " + p.fields.authors + " " + p.fields.title
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
