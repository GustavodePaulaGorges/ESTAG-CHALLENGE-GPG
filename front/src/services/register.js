import api from "../plugins/api";

class RegisterService {
  async postRegister(form) {
    try {
      const res = await api.post("/register.php?op=POST", form);
      console.log(res);
      return true
    } catch (error) {
      console.error(error);
    }
  }
  // async deletePost(post) {
  //   const response = await api.delete(`/posts/${post.id}/`)
  //   return response.data
  // }
}

export default new RegisterService();
