<template>
    <div class="form-page">form</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {},
})
export default class AutoForm extends Vue {}
</script>
<style scoped>
.form-page {
    width: 100vw;
    height: 100vh;
    padding: 0;
}
</style>
