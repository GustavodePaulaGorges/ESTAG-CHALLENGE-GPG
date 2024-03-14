import api from "../plugins/api";

class OrderService {
  async getAllOrders() {
    const response = await api.get("/orders.php?op=GET");
    return response.data;
  }
  async postOrder(form) {
    try {
      const res = await api.post("/orders.php?op=POST", form);
    } catch (error) {
      console.error(error);
    }
  }

  async deletePost(post) {
    const response = await api.delete(`/posts/${post.id}/`);
    return response.data;
  }
}

export default new OrderService();
