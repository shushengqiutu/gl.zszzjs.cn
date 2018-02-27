const localStoragePlugin = store => {
    store.subscribe((mutation, state) => {
        console.log( 'mutation', mutation, 'state', state )

        if( mutation.type == 'getAdminInfo' ) {
            window.localStorage.setItem("getAdminInfo", JSON.stringify(state.admin))
        }
    })
};

export default [localStoragePlugin]
