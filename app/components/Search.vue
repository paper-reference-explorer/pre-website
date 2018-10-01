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
        :search-input.sync="search"
        v-model="select"
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
            select: null,
        }),
        watch: {
            search(val) {
                val && val !== this.select && this.querySelections(val);
            }
        },
        methods: {
            querySelections(query) {
                this.loading = true;
                axios.get('/search', {params: {keyword: query}})
                    .then((response) => {
                        this.items = response.data.papers
                            .map(p => p.year + " - " + p.authors + " " + p.title)
                            .filter(e => {
                                return (e || '').toLowerCase().indexOf((query || '').toLowerCase()) > -1
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
