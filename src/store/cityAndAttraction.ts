import { defineStore } from 'pinia'
const useCityAndAttractionStore = defineStore('cityAndAttraction',
    {
        state: () => {
            return {
                cities: [],
                attractions: [],
                selectedCityId: 1,
                selectedAttractionId: 1
            }
        },
        getters: {
            getCities(): any {
                return this.cities.splice(0, 10)
            },
            getAttractions(): any {
                return this.attractions.splice(0, 10)
            },
            getSelectedCityId(): any {
                return this.selectedCityId
            },
            getSelectedAttractionId(): any {
                return this.selectedAttractionId
            }
        },
        actions: {
            saveCities(cities: any) {
                this.cities = cities
            },
            saveAttractions(attractions: any) {
                this.attractions = attractions
            },
            saveCityId(id: number) {
                this.selectedCityId = id
            },
            saveAttractionId(id: number) {
                this.selectedCityId = id
            },
        }
    }
)
export default useCityAndAttractionStore