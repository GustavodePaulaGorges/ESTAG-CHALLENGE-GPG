import api from "../plugins/api";

class ProductService {
  async getAllProducts() {
    return new Promise(async (resolve, reject) => {
      
      const response = await api.get("/products.php?op=GET");
    
      resolve(await response.data);
    
    })
  }
  async postProduct(form) {
    try {
      const res = await api.post("/products.php?op=POST", form);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }
  // async deletePost(post) {
  //   const response = await api.delete(`/posts/${post.id}/`)
  //   return response.data
  // }
}

export default new ProductService();
