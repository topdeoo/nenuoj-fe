<script setup>
import { useI18n } from "vue-i18n";
import { timePretty } from "@/util/formate";
import { Card } from "view-ui-plus";
import { useRoute, useRouter } from "vue-router";
import { toRef } from "vue";
const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const reload = (payload = {}) => {
  router.push({
    name: "home",
    query: Object.assign(query, purify(payload)),
  });
};

const list = toRef([
  {
    id: 0,
    title: "Hello World",
    create: "2021-08-01 00:00:00",
  },
]);
</script>

<template>
  <div class="home-wrap">
    <div class="news">
      {{ t("oj.news_list") }}
    </div>
    <Card v-for="item in list" :key="item.id">
      <Row type="flex" align="middle">
        <Col :span="2">
          <Icon type="md-chatbubbles" />
        </Col>
        <Col :span="20">
          <RouterLink :to="{ name: 'newsInfo', params: { nid: item.nid } }">
            <span>{{ item.title }}</span>
          </RouterLink>
          <p>{{ timePretty(item.create) }}</p>
        </Col>
        <Col :span="2">
          <Icon
            v-if="isAdmin && canRemove"
            type="md-close-circle"
            @click="del(item.nid)"
          />
        </Col>
      </Row>
    </Card>
  </div>
</template>

<style lang="stylus"></style>
