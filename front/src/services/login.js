import api from "../plugins/api";

class LoginService {
  async postLogin(form) {
    try {
      const res = await api.post("/login.php?op=POST", form);
      console.log(res)
      if(res.data.token){
        
        const profile = JSON.parse(res.data.profile)
        localStorage.setItem('f_name', profile.first_name)
        localStorage.setItem('l_name', profile.last_name)
        sessionStorage.setItem('token', res.data.token)
        return true
        
      } else {
        alert (res.data)
        return false
      }
    } catch (error) {
      console.error(error);
    }
  }
  async postLogout(){
    sessionStorage.setItem('token', '');
    sessionStorage.clear
  }
  // async deletePost(post) {
  //   const response = await api.delete(`/posts/${post.id}/`)
  //   return response.data
  // }
}

export default new LoginService();
