export const state = () => ({
    userData: null,
    holdOfflineImageData: null
})
  
  export const getters = {
    fetchUserData(state){
        return state.userData
    },

    fetchOfflineImage(state){
        return state.holdOfflineImageData
    },
  }
  
  export const mutations = {
    resetUser(state) {
        state.userData = null
        state.holdOfflineImageData = null
    },

    setUser(state, value) {
        state.userData = value
    },

    setOfflineImage(state,value){
        state.holdOfflineImageData = value
    },

    resetAllImage(state){
        state.holdOfflineImageData = null
        state.userData.signature = null
    },

    changeUserData(state,data){
        state.userData.signature = data.signature
        state.userData.firstName = data.firstName
        state.userData.lastName = data.lastName
        state.userData.employeeId = data.employeeId
    },

    changeSrValues(state,data){
        state.userData.srDate = data.srDate
        state.userData.count = data.count
    }
  }
  
  export const actions = {
    async copyUser({ commit }, data){
        commit('setUser', data)
    },

    removeUser({ commit }){
        commit('resetUser')
    },

    saveImage({ commit }, data){
        commit('setOfflineImage', data)
    },

    resetImage({ commit }){
        commit('resetAllImage')
    },

    updateUser({ commit }, data){
        commit('changeUserData', data)
    },

    updateSrDateAndCount({ commit }, data){
        commit('changeSrValues', data)
    },
    
    updateUserMe(_,payload){
        console.log(payload)
    }
  }