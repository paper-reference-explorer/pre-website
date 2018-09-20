<template>
    <md-card>
        <md-card-header>
            <div class="md-title">Added papers</div>
        </md-card-header>
        <md-card-content>
            <md-list class="md-double-line">
                <md-list-item>
                    <div class="md-list-item-text">
                        <span>My paper</span>
                        <span>A et. al.</span>
                    </div>
                    <md-button class="md-icon-button md-list-action">
                        <md-icon>delete</md-icon>
                    </md-button>
                </md-list-item>
            </md-list>
        </md-card-content>
    </md-card>
</template>

<script>
    export default {
        name: 'User'
    };
</script>
