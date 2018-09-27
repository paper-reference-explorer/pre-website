<template>
    <div class="search-wrapper">
        <md-field class="wrapper">
            <md-button id="search-button" class="md-icon-button">
                <md-icon>search</md-icon>
            </md-button>
            <md-input placeholder="Search for an arXiv paper">
            </md-input>
        </md-field>
    </div>
</template>

<script>
    export default {
        name: "Search"
    };
</script>

<style type="scss">
    .search-wrapper {
        display: flex;
        height: 64px;
    }

    .wrapper {
        margin: 16px 0 !important;
        padding: 0 !important;
        height: 32px !important;
        min-height: 32px !important;
    }

    #search-button {
        margin-top: -5px !important;
    }
</style>
