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

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import { Paper, SearchItem, SearchResult } from '@/typings.d';

@Component
export default class About extends Vue {
  loading: boolean | string = false;

  items: SearchItem[] = [];

  search?: string = '';

  select: Paper | null = null;

  @Watch('search')
  onSearchPropertyChanged(newValue: string, oldValue: string) {
    // if (newValue && newValue !== this.select) {
    this.querySelections(newValue);
    // }
  }

  @Watch('select')
  onSelectPropertyChanged(newValue: Paper, oldValue: Paper) {
    if (newValue) {
      this.$store.dispatch('addPaper', newValue);
      this.select = null;
      this.items = [];
    }
  }

  querySelections(query: string) {
    this.loading = '#FF9800'; // accent color
    const parameters = {
      search_request: {
        query: {
          query,
        },
        size: 10,
        from: 0,
        fields: [
          '*',
        ],
        sort: [
          '-_score',
        ],
        facets: {},
        highlight: {},
      },
    };

    axios.post('/rest/_search', parameters)
      .then((response) => {
        const papers: SearchResult[] = response.data.search_result.hits;
        this.items = papers.map(p => ({
          paper: {
            key: p.id,
            year: p.fields.year,
            authors: p.fields.authors,
            title: p.fields.title,
          },
          description: `${p.fields.year} - ${p.fields.authors} ${p.fields.title}`,
        }));
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        this.loading = false;
      });
  }
}
</script>

<style scoped lang="scss">
</style>
