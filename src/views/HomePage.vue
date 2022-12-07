<script setup>
import only from "only";
import { useI18n } from "vue-i18n";
import { timePretty } from "@/util/formate";
import { Card } from "view-ui-plus";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { purify } from "@/util/helper";
import { useSessionStore } from "@/store/modules/session";
import { storeToRefs } from "pinia";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const query = computed(() => {
  const opt = only(route.query, "page pageSize");
  return purify(opt);
});
const sessionStore = useSessionStore();
const { isAdmin, canRemove } = storeToRefs(sessionStore);

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
    create: 202210211111,
  },
]);

console.log(computed(() => isAdmin));
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
    <Page
      :model-value="page"
      :total="sum"
      :page-size="pageSize"
      show-elevator
      @on-change="pageChange"
    />
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
