import aPi from '../api'

export default{
    fetchInfo( { commit } ) {
        aPi.getInfo()
            .then( data => {
                console.log(data)
             //   commit('getData')
            })
    },
}