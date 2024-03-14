import "../../styles/components.css";
import ProdCard from "./prodCard";
import ProdCardDisabled from "./prodCardDisabled";
import { useState } from "react";

function ProductsList({ products, categories }) {
  const [category, setCategory] = useState("");
  const [selectedProds, setSelectedProds] = useState([]);

  const onChangeCategory = (categoria) => {
    let listSelectedProds = products.filter(
      (product) => product.category_code == categoria
    );
    setSelectedProds(listSelectedProds);
  };

  return (
    <>
      <div className="ListHead">
        <div>
          <h2>O que você está procurando hoje?</h2>
          <select
            className="SelectCategory"
            onChange={(e) => {
              setCategory(e.target.value);
              onChangeCategory(e.target.value);
            }}
          >
            <option disabled selected>
              Selecione uma Categoria
            </option>
            {categories.map((category) => (
              <option key={category.code} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <span className="ItemsFound">
          {selectedProds.length == 1 ? (
            <>
              <span className="NHigh">{selectedProds.length}</span>produto
              encontrados
            </>
          ) : (
            <>
              <span className="NHigh">{selectedProds.length}</span>produtos
              encontrados
            </>
          )}
        </span>
      </div>
      <div>
        <div className="ListBody">
          {selectedProds.length >= 1 ? (
            selectedProds.map((product) => {
              if (product.amount >= 1) {
                return (
                  <>
                    <ProdCard key={product.code} product={product} />
                  </>
                );
              } else {
                return <><ProdCardDisabled key={product.code} product={product} /></>;
              }
            })
          ) : (
            <h2>
              Infelizmente ainda não possuimos nenhum produto com essa
              categoria...
            </h2>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductsList;
