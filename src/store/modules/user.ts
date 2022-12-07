import { defineStore } from 'pinia';
import api from '@/api';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {},
        solved: [],
        unsolved: [],
        group: []
    }),

    actions: {
        async findOne(payload: string) {
            const { data } = await api.user.findOne(payload);
            this.user = data.user;
            this.solved = data.solved;
            this.unsolved = data.unsolved;
            this.group = data.group;
        },
    }

});
