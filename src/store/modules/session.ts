import { permission } from '@/util/constant';
import { defineStore } from 'pinia';
import { useRootStore } from '..';
import api from '@/api';
import type { LoginParam, Profile, RegisterParam } from '@/types';

export const useSessionStore = defineStore('session', {
    state: () => ({
        loginDialog: false,
        profile: null as (null | Profile),
        token: null as (null | string),
    }),
    getters: {
        isLogined: state => state.profile != null,
        // Return type must be set in order to use `this`
        // https://pinia.vuejs.org/core-concepts/getters.html#getters
        isAdmin(): boolean {
            return this.isLogined
                && (this.profile?.permission === permission.teacher);
        },
        canRemove(): boolean {
            return this.isLogined
                && (this.profile?.permission === permission.teacher);
        },
    },
    actions: {
        toggleLoginState() {
            this.loginDialog = !this.loginDialog;
        },
        setLoginProfile(profile: Profile) {
            this.profile = profile;
        },
        getToken() {
            return this.token;
        },
        setToken(token: string) {
            this.token = token;
        },
        async login(opt: LoginParam) {
            const data = <Profile>await api.login(opt);
            this.profile = data;
            return data;
        },
        async logout() {
            await api.logout();
            this.profile = null;
        },
        async sendRegisterCode(email: string) {
            await api.sendRegisterCode(email);
        },
        async register(opt: RegisterParam) {
            const data = <Profile>await api.register(opt);
            this.profile = data;
            return data;
        }
        // },
        // async fetch () {
        //   const { data } = await api.session.fetch()
        //   this.profile = data.profile
        // },
    },
});
