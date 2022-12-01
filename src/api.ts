import axios from 'axios';
import type { TimeResp, WebsiteConfigResp, LoginParam, Profile } from "./types";

const instance = axios.create()


const api = {
    getTime: () => instance.get<TimeResp>('/servertime'),
    getWebsiteConfig: () => instance.get<WebsiteConfigResp>('/website'),
    token: {
        create: (data: LoginParam) => instance.post < {
            profile: Profile
        }>('/login', data),
        delete: () => instance.delete<{}>('/logout'),
    }
}
export default {
    ...api,
    login: api.token.create,
    logout: api.token.delete
}