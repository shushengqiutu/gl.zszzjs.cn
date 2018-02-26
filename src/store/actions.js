import aPi from './api'

export const actions = {
    fetchPlans( { commit } ) {
       api.getPlans()
            .then( data => {
                commit('getData')
            })
    },
}