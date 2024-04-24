import { defineStore } from 'pinia'
const usePlan = defineStore('plan',
    {
        state: () => {
            return {
                planId: 1
            }
        },
        getters: {
            getPlanId(): any {
                return this.planId
            },
        },
        actions: {
            savePlanId(id: number) {
                this.planId = id
            }
        }
    }
)
export default usePlan