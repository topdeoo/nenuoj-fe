<script lang="ts">
import { useRoute } from "vue-router";
import { inject, watch } from "vue";
import { useI18n } from "vue-i18n";
import OjLayout from "@/components/Layout.vue";
import { useRootStore } from "@/store";

export default {
  name: "App",
};
</script>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
</script>

<template class="container">
  <div id="app">
    <OjLayout />
  </div>
</template>
