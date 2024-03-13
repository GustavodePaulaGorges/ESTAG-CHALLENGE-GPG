import api from "../plugins/api";


class CategoryService {
    async getAllCategories() {
      const response = await api.get('/categories.php?op=GET')
      return response.data
    }
    async postCategory(form) {
      try {
        const res = await api.post(
          "/categories.php?op=POST",
          form
        );
      } catch (error) {
        console.error(error);
      }
    }
    
    async deletePost(post) {
      const response = await api.delete(`/posts/${post.id}/`)
      return response.data
    }
  }
  
  export default new CategoryService()

//   async postCategory = () => {
//     try {
//       const res = await fetch(urlPost, {
//         method: "POST",
//         body: data,
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
// };