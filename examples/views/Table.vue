<template>
    <div class="table-page">table</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class Table extends Vue {}
</script>
<style scoped>
.table-page {
    width: 100vw;
    height: 100vh;
    padding: 0;
}
</style>
