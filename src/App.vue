<script lang="ts">
import { useRoute } from "vue-router";
import { inject, watch } from "vue";
import { useI18n } from "vue-i18n";
import OjLayout from "@/components/Layout.vue";

export default {
  name: "App",
};
</script>

<script setup lang="ts">
const { t } = useI18n();
const route = useRoute();
</script>

<template>
  <div class="container">
    <OjLayout />
  </div>
</template>

<style>
.container {
  display: block;
  height: 100vh;
  overflow-y: scroll;
  min-width: 100vw;
  margin: 0 auto;
}
</style>
