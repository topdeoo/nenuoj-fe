import axios from 'axios';
import type { TimeResp, WebsiteConfigResp, LoginParam, RegisterParam } from "@/types";
import { useSessionStore } from "@/store/modules/session";


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 3000,
});


instance.interceptors.request.use(
    config => {
        const SessionStore = useSessionStore();
        const isToken = (config.headers || {}).isToken === false;
        if (SessionStore.getToken() && !isToken) {
            if (config && config.headers) {
                config.headers.Authorization = 'Bearer' + SessionStore.getToken();
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


const api = {
    getTime: () => instance.get<TimeResp>('/servertime'),
    getWebsiteConfig: () => instance.get<WebsiteConfigResp>('/website'),
    sendRegisterCode: (email: string) => instance.get('/user/register-code', {
        params: {
            email: email
        }
    }),
    register: (data: RegisterParam) => instance.post('/user/register', data).then(response => {
        const SessionStore = useSessionStore();
        if (response.headers['Authorization']) {
            SessionStore.setToken(response.headers['Authorization']);
        }
        return response.data;
    }).catch(error => {
        console.log(error);
    }),
    user: {
        findOne: (username: string) => instance.get('/user/getUserProfile', {
            params: {
                username: username
            }
        }).then(response => {
            return response.data;
        }),
    },
    token: {
        create: (data: LoginParam) =>
            instance.post('/user/login', data)
                .then(response => {
                    const SessionStore = useSessionStore();
                    if (response.headers['Authorization']) {
                        SessionStore.setToken(response.headers['Authorization']);
                    }
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                }),
        delete: () => instance.delete<{}>('/user/logout'),
    }
};
export default {
    ...api,
    login: api.token.create,
    logout: api.token.delete,
};