<template>
<v-navigation-drawer
  :clipped="$vuetify.breakpoint.lgAndUp"
  fixed
  app
  width="326"
  v-model="isOpen"
> <!-- 320 (title width) + 6 (toolbar padding) = 326 -->
  <v-subheader>Information</v-subheader>
  <Information></Information>

  <v-divider></v-divider>

  <v-list
    subheader
    two-line
  >
    <v-subheader>
      <span
        v-show="this.hasPapers"
      >
        Added papers
      </span>
      <span
        v-show="!this.hasPapers"
      >
        No papers added yet
      </span>

      <v-spacer></v-spacer>

      <v-btn
        flat
        small
        @click="$store.dispatch('removeAllPapers')"
        :disabled="!this.hasPapers"
      >
        Delete all
      </v-btn>
    </v-subheader>

    <template
      v-for="(paper, index) in this.addedPapers"
    >
    <v-hover
      close-delay="0"
      :key="paper.key"
    >
      <v-list-tile
        slot-scope="{ hover }"
        @mouseenter="$store.dispatch('setHover', paper.key)"
        @mouseleave="$store.dispatch('removeHover', paper.key)"
      >
        <!-- @click is needed for gray hover effect -->
        <v-list-tile-content>
          <v-list-tile-title>{{ paper.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ paper.year }} - {{ paper.authors }}
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn
            v-if="hover"
            icon
            @click="$store.dispatch('removePaper', index)"
          >
            <v-icon>delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-hover>
    </template>
  </v-list>
</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Information from '@/components/Information.vue';

@Component({
  components: {
    Information,
  },
})
export default class Drawer extends Vue {
  get isOpen() {
    return this.$store.state.isDrawerOpen;
  }

  set isOpen(newValue) {
    this.$store.dispatch('setDrawerStatus', newValue);
  }

  get addedPapers() {
    return this.$store.state.addedPapers;
  }

  get hasPapers() {
    return this.$store.state.addedPapers.length > 0;
  }
}
</script>

<style scoped lang="scss">
</style>
