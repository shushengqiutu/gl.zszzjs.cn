const localStoragePlugin = store => {
    store.subscribe((mutation, state) => {
        console.log( 'mutation', mutation, 'state', state )



        if( mutation.type == 'getAdminInfo' || mutation.type == 'setProjectId') {
            window.localStorage.setItem("adminInfo", JSON.stringify(state.admin))
        }

        if( mutation.type == 'getStudentData' ) {
            window.localStorage.setItem("studentData", JSON.stringify(state.studentData))
        }

    })
};

export default [localStoragePlugin]
