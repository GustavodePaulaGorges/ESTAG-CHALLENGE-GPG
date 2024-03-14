import { useDispatch, useSelector } from "react-redux";
import { setProd } from "../../redux/actions/setProd";
import { useState } from "react";
import RemoveItem from "../../assets/RemoveItem.svg";

import ProductService from "../../services/products";

function prodForm({ categories }) {
  const { currentProd } = useSelector((state) => state.prodReducer);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const postProduct = async (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("name", name);
    form.append("catcode", category);
    form.append("amnt", amount);
    form.append("price", price);
    form.append("image", image);
    await ProductService.postProduct(form);
  };

  const dispatch = useDispatch();

  const handleOpenProd = () => {
    dispatch(setProd(!currentProd));
  };

  return (
    <>
      <div className={currentProd ? "modalBg" : "hidden"}>
        <div className="formWrapper">
          <button onClick={handleOpenProd} className="remove float">
            <img src={RemoveItem} className="btnIcon"></img>
          </button>
          <h2>Adicione um produto!</h2>

          <form
            className="prodForm"
            onSubmit={(e) => {
              e.preventDefault();
              postProduct(e);
            }}
          >
            <div>
              <label for="prodName">Nome</label>
              <input
                className="w-80"
                name="prodName"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label for="prodCategory">Categoria</label>
              <select
                className="w-80"
                name="prodCategory"
                onChange={(e) => {
                  setCategory(e.target.value);
                  console.log(e.target.value);
                }}
              >
                <option disabled selected>
                  Selecione uma Categoria
                </option>
                {categories.map((category) => (
                  <option value={category.code}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label for="prodAmount">Quantidade em estoque</label>
              <input
                className="w-80"
                type="number"
                name="prodAmount"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label for="prodPrice">Preço unitário (sem taxa)</label>
              <input
                className="w-80"
                type="number"
                step="0.01"
                name="prodPrice"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label for="prodImg">Link para uma foto do produto</label>
              <input
                className="w-80"
                type="url"
                name="prodImg"
                onChange={(e) => {
                  setImage(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <button className="w-80">Adicionar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default prodForm;
