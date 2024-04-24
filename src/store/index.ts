import { defineStore } from 'pinia'
export const useLoginStateStore = defineStore('login', {
    state: () => {
        return {
            loginState: false
        }
    },
    actions: {
        logIn() {
            this.loginState = true
        },
        signOut() {
            this.loginState = false
        }
    }
})