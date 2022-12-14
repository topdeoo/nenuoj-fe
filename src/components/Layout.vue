<script setup>
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { inject, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import Dialog from "./LoginAndRegister";
import { useSessionStore } from "@/store/modules/session";
import { useRootStore } from "@/store";
import { timePretty } from "@/util/formate";
import { useHumanLanguage } from "@/util/helper";
import { Icon, MenuItem } from "view-ui-plus";

const rootStore = useRootStore();
const route = useRoute();
const router = useRouter();
const $Message = inject("$Message");
const { currentTime } = storeToRefs(rootStore);

let theme = ref("light");

const active = computed(() => route.name);
const { t, locale } = useI18n();
let selectedLang = useHumanLanguage();
locale.value = selectedLang;
const sessionStore = useSessionStore();
const { toggleLoginState, logout } = sessionStore;
const { profile, isAdmin, isLogined } = storeToRefs(sessionStore);

// possible bug that e is not catched in #catch
const routerTo = (name) => {
  if (route.name !== name) {
    router.push({ name });
  }
};

const login = toggleLoginState;

function langSelected(lang) {
  locale.value = selectedLang = lang;
}

function profileAction(name) {
  if (name === "logout") {
    logout().then(() => $Message.info("bye bye!"));
  } else if (name === "profile") {
    router.push({ name: "userInfo", params: { username: profile.value.username } });
  }
}

function themeSelect() {
  if (theme.value === "light") {
    theme.value = "dark";
  } else {
    theme.value = "light";
  }
}
</script>

<script>
export default {
  name: "OjLayout",
};
</script>

<template>
  <div class="nav-wrap">
    <!-- TODO 切换日间模式与夜间模式 -->
    <Layout>
      <Header :style="{ position: 'fixed', width: '100%', 'z-index': 100 }">
        <Menu mode="horizontal" :active-name="active" @on-select="routerTo">
          <div class="left">
            <MenuItem name="home">
              <Icon type="ios-home" size="20" />{{ t("oj.home") }}
            </MenuItem>
            <MenuItem name="problemlist">
              <Icon type="ios-code-working" />{{ t("oj.problem_list") }}
            </MenuItem>
            <MenuItem name="status">
              <Icon type="ios-pulse" />{{ t("oj.status") }}
            </MenuItem>
            <MenuItem name="ranklist">
              <Icon type="ios-stats" />{{ t("oj.ranklist") }}
            </MenuItem>
            <MenuItem name="contest">
              <Icon type="ios-trophy" />{{ t("oj.contest_list") }}
            </MenuItem>
            <MenuItem name="discuss">
              <Icon type="ios-chatbubbles" />{{ t("oj.discussion_list") }}
            </MenuItem>
            <MenuItem name="group">
              <Icon type="ios-people" />{{ t("oj.group") }}
            </MenuItem>
            <MenuItem name="faq">
              <Icon type="md-help-circle" />{{ t("oj.faq") }}
            </MenuItem>
            <Submenu v-if="isAdmin" name="admin">
              <template #title>
                <Icon type="md-paper-plane" />{{ t("oj.admin") }}
              </template>
              <MenuItem name="problemCreate">
                {{ t("oj.create_problem") }}
              </MenuItem>
              <MenuItem name="contestCreate">
                {{ t("oj.create_contest") }}
              </MenuItem>
              <MenuItem name="newsCreate">
                {{ t("oj.create_news") }}
              </MenuItem>
              <MenuItem name="userEdit">
                {{ t("oj.user_management") }}
              </MenuItem>
            </Submenu>
          </div>
        </Menu>
        <div class="right">
          <Dropdown v-if="isLogined" @on-click="profileAction">
            <a href="javascript:void(0)">
              <Icon type="md-contact" />
              {{ profile.username }}
              <Icon type="ios-arrow-down" />
            </a>
            <template #list>
              <DropdownMenu>
                <DropdownItem name="profile">
                  {{ t("oj.profile") }}
                </DropdownItem>
                <DropdownItem name="logout">
                  {{ t("oj.logout") }}
                </DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
          <Button v-else type="text" @click="login">
            {{ t("oj.login") }} / {{ t("oj.register") }}
          </Button>
          <Dropdown @on-click="langSelected">
            <Button type="text">
              <span>({{ t("oj.human_language") }})</span>
              <img src="../assets/i18n.svg" alt="" style="height: 1.2em" />
            </Button>
            <template #list>
              <DropdownMenu>
                <DropdownItem name="en-US"> English </DropdownItem>
                <DropdownItem name="zh-CN"> 简中 </DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
          <Button v-model="theme" @click="themeSelect" type="text">
            <Icon type="ios-sunny" label="light" v-if="theme === 'light'" />
            <Icon v-else type="ios-moon" label="dark" />
          </Button>
        </div>
      </Header>
      <Content
        :style="{
          margin: '88px 20px 0',
          background: '#fff',
          minHeight: '500px',
          padding: '20px 40px',
        }"
      >
        <RouterView />
      </Content>
      <Footer class="layout-footer-center">
        <p>Server Time: {{ timePretty(currentTime) }}</p>
        <strong>Segmention Fault</strong> by
        <a href="https://github.com/topdeoo" target="_blank"
          >topdeoo<Icon type="logo-github"></Icon
        ></a>
      </Footer>
    </Layout>
    <Dialog />
  </div>
</template>

<style lang="stylus">
.nav-wrap
  border: 1px solid #d7dde4
  background: #f5f7f9
  position: relative
  border-radius: 4px
  overflow: hidden
  .ivu-layout-header
    display: flex
    position: fixed
    justify-content: space-between
    background: #fff
    padding: 2px 0px 0px 0px
    height: 62px
    line-height: 62px
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1)
  .ivu-menu-horizontal
    height: 62px
    line-height: 60px
  .left
    width: 900px
    margin: 0 auto
    margin-left: 5%
  .right
    margin-right: 5%
    .ivu-btn
      font-size: 14px
      margin-bottom: 6px
  .layout-footer-center
    text-align: center
    bottom: 0
    p
      margin-bottom: 8px
  .i18n::before
    content: url('../assets/i18n.svg')
  .ivu-layout
    height: 100%
</style>
