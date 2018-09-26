<template>
    <div>
        <div class="container">
            <md-field class="">
                <md-button id="search-button" class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>
                <md-input id="search-box" class="md-accent">
                </md-input>
            </md-field>
        </div>
        <br/>
    </div>
</template>

<script>
    export default {
        name: "Search"
    };
</script>

<style>
    .search-button {
        min-width: 24px !important;
    }
</style>
