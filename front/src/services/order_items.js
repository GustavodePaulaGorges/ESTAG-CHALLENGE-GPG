import api from "../plugins/api";

class Order_ItemService {
  async getAllOrder_Items() {
    return new Promise(async (resolve, reject) => {
      
      const response = await api.get("/order_items.php?op=GET");
    
      resolve(await response.data);
    
    })
  }
  async postOrder_Item(form) {
    try {
      const res = await api.post("/order_items.php?op=POST", form);
      console.log(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  async deletePost(post) {
    const response = await api.delete(`/posts/${post.id}/`);
    return response.data;
  }
}

export default new Order_ItemService();
