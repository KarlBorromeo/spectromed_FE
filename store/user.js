export const state = () => ({
  })
  
  export const getters = {
  }
  
  export const mutations = {
  }
  
  export const actions = {
    async fetchUserMe(){
        try{
            const params = {
                populate: '*'
            }
            const response = await this.$axios.get(`/users/me`,{
                params
            })
            return response.data
        }catch(error){
           throw error
        }
    },
    updateUserMe(_,payload){
        console.log(payload)
    }
  }