<script setup>
import only from "only";
import { useI18n } from "vue-i18n";
import { useSessionStore } from "@/store/modules/session";
import { ref, computed, inject } from "vue";
import { storeToRefs } from "pinia";

const password_requiremnt = computed(() => t("oj.password_requirement"));
const { t } = useI18n();
const $Message = inject("$Message");
let mode = ref("login");
const form = ref({
  username: "",
  password: "",
  email: "",
  checkPassword: "",
  code: "",
});

const validatePass1 = (rule, value, callback) => {
  const error = !/[0-9a-zA-Z]{5,50}$/.test(value) ? new Error(password_requiremnt) : null;
  error ? callback(error) : callback();
};

const validatePass2 = (rule, value, callback) => {
  const error =
    value !== form.value.password ? new Error(t("oj.password_not_match")) : null;
  error ? callback(error) : callback();
};

const basicRules = {
  username: [
    { required: true, message: t("oj.username_missing"), trigger: "change" },
    { min: 4, max: 50, message: t("oj.username_length_requirement"), trigger: "change" },
  ],
  password: [{ required: true, message: t("oj.password_missing"), trigger: "change" }],
};

const sessionStore = useSessionStore();
const { login, sendRegisterCode, register } = sessionStore;
const visible = computed(() => sessionStore.loginDialog);
const triggerLogin = sessionStore.toggleLoginState;
const loginForm = ref(null);
const registerForm = ref(null);
const { isAdmin, canRemove } = storeToRefs(sessionStore);

const loginRules = basicRules;
const registerRules = {
  username: basicRules.username.concat({
    required: true,
    type: "string",
    pattern: /^\w+$/gi,
    message: t("oj.username_char_requirement"),
    trigger: "change",
  }),
  password: [
    { required: true, message: t("oj.password_missing"), trigger: "change" },
    { validator: validatePass1, trigger: "change" },
  ],
  email: [
    { required: true, message: t("oj.email_missing"), trigger: "change" },
    { type: "email", message: t("oj.email_format_error"), trigger: "change" },
  ],

  checkPassword: [
    { required: true, message: t("oj.password_confirm_missing"), trigger: "change" },
    { validator: validatePass2, trigger: "change" },
  ],
  code: [
    { required: true, message: t("oj.code_missing"), trigger: "change" },
    { min: 6, max: 6, message: t("oj.code_length_requirement"), trigger: "change" },
  ],
};

function sendCode() {
  sendRegisterCode(form.value.email);
  //   $Message.success(`Send Email Successfully`);
  console.log("send code");
}

function submit() {
  if (mode.value === "login") {
    loginForm.value.validate(async (valid) => {
      if (!valid) return;
      await login({
        username: form.value.username,
        password: form.value.password,
      });
      $Message.success(`Welcome, ${form.value.username} !`);
      triggerLogin();
      console.log(isAdmin.value, canRemove.value);
    });
  } else {
    registerForm.value.validate(async (valid) => {
      if (!valid) return;
      await register(form);
      mode.value = "login";
      submit();
    });
  }
}
</script>

<template>
  <Modal v-model="visible" :closable="false" @on-cancel="triggerLogin">
    <Tabs v-model="mode">
      <TabPane :label="t('oj.login')" name="login">
        <Form ref="loginForm" :model="form" :rules="loginRules" :label-width="100">
          <FormItem class="loginuid" :label="t('oj.username')" prop="username">
            <Input v-model="form.username" />
          </FormItem>
          <FormItem class="loginpwd" :label="t('oj.password')" prop="password">
            <Input v-model="form.password" type="password" @keyup.enter="submit" />
          </FormItem>
        </Form>
      </TabPane>
      <TabPane :label="t('oj.register')" name="register">
        <Form ref="registerForm" :model="form" :rules="registerRules" :label-width="100">
          <FormItem :label="t('oj.username')" prop="username">
            <Input v-model="form.username" :placeholder="t('oj.username_description')" />
          </FormItem>
          <FormItem :label="t('oj.email')" prop="email">
            <Row>
              <Col span="16">
                <Input v-model="form.email" />
              </Col>
              <Col span="2" offset="1">
                <Button @click="sendCode">{{ t("oj.send_code") }}</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem :label="t('oj.password')" prop="password">
            <Input v-model="form.password" type="password" />
          </FormItem>
          <FormItem
            :label="t('oj.password_confirm')"
            prop="checkPassword"
            class="checkpwd"
          >
            <Input v-model="form.checkPassword" type="password" />
          </FormItem>
          <FormItem :label="t('oj.code')" prop="code">
            <Input v-model="form.code" type="text" />
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
    <template #footer>
      <Row type="flex" justify="center">
        <Col :span="20">
          <Button type="primary" size="large" long @click="submit">
            {{ t("oj.submit") }}
          </Button>
        </Col>
      </Row>
    </template>
  </Modal>
</template>

<style lang="stylus" scoped>
.ivu-tabs-nav-container
  font-size: 16px
.ivu-tabs-nav
  .ivu-tabs-tab
    padding: 8px 16px 12px 16px
.ivu-form-item
  margin-right: 20px
.checkpwd
  margin-bottom: 5px
.loginuid
  margin-top: 56px
  margin-bottom: 30px
</style>
