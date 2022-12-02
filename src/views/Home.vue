<script setup>
import { useI18n } from "vue-i18n";
import { timePretty } from "@/util/formate";
import { Card } from "view-ui-plus";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const reload = (payload = {}) => {
  router.push({
    name: "home",
    query: Object.assign(query, purify(payload)),
  });
};

const list = ref([
  {
    nid: 0,
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

<style lang="stylus">
.home-wrap
  margin: 0 10%
  .news
    font-size: 40px
    padding-bottom: 10px
  .content
    padding-left: 20px
    padding-bottom: 20px
    margin-bottom: 20px
    border-bottom: 1px solid #dfd8d8
  .ivu-card
    margin-bottom: 20px
    .ivu-icon-md-chatbubbles
      font-size: 24px
      margin-left: 30%
      // color: alpha($primary-color, 0.9)
      color: var(--oj-primary-color)
      opacity: 0.85
    p
      margin-top: 10px
    .ivu-icon-md-close-circle
      opacity: 0.85
      font-size: 1.5rem
      // color: #c3c2c2
      cursor: pointer
</style>
