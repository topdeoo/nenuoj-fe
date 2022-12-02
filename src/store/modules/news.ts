import { defineStore } from 'pinia'
import api from '@/api';

export const useNewsStore = defineStore('news', {
  state: () => ({
    list: [],
    news: {},
    sum: 0,
  }),
})
