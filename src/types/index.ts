import type { permission } from '@/util/constant';
export interface TimeResp {
    serverTime: number;
}

export interface WebsiteConfigResp {
    website: {
        discussOnProblem: boolean; // obsolete
        semi_restful: boolean;
        title: string;
    };
}

export interface User {
    nickname: string;

    username: string;

    avatar: string;

    email: string;

    number: string;

    school: string;

    course: string;

    signature: string;

    realname: string;

    github: string;

    blog: string;

    permission: (typeof permission)[keyof typeof permission];
}

export type Profile = User;

export interface LoginParam {
    username: string;
    password: string;
}

export interface RegisterParam {
    username: string;
    password: string;

    email: string;

    code: string;
}

export interface Paginated<T> {
    list: {
        docs: T[];
        limit: number;
        page: number;
        pages: number;
        total: number;
    };
}

export interface Problem {
    pid: number;
    title: string;
    description: string;
    input: string;
    output: string;
}
