import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/actions/setCategory";
import { useState } from "react";
import CategoryService from "../../services/categories";

import RemoveItem from "../../assets/RemoveItem.svg";

function catForm() {
  const { currentCategory } = useSelector((state) => state.categoryReducer);

  const [name, setName] = useState("");
  const [tax, setTax] = useState("");

  const dispatch = useDispatch();

  const handleOpenCategory = () => {
    dispatch(setCategory(!currentCategory));
  };

  const postCategory = async (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("name", name);
    form.append("tax", tax);
    await CategoryService.postCategory(form);
  };

  return (
    <>
      <div className={currentCategory ? "modalBg" : "hidden"}>
        <div className="formWrapper">
          <button onClick={handleOpenCategory} className="remove float">
            <img src={RemoveItem} className="btnIcon"></img>
          </button>
          <h2>Adicione uma categoria!</h2>

          <form
            className="prodForm"
            id="prodForm"
            onSubmit={(e) => {
              e.preventDefault();
              postCategory(e);
            }}
          >
            <div>
              <label for="catName">Nome</label>
              <input
                className="w-80"
                name="catName"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label for="catTax">Porcentagem de taxa</label>
              <input
                className="w-80"
                type="number"
                max={100}
                name="catTax"
                onChange={(e) => {
                  setTax(e.target.value);
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

export default catForm;
