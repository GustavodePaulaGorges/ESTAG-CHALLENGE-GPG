import ProdRow from "./prodRow";
import { useDispatch, useSelector } from "react-redux";
import { setProd } from "../../redux/actions/setProd";

function cadList({ products, categories }) {
  const { currentProd } = useSelector((state) => state.prodReducer);

  const dispatch = useDispatch();
  const handleOpenProd = () => {
    dispatch(setProd(!currentProd));
  };

  console.log(products);
  return (
    <>
      <div className="w-60">
        <h2>Listagem de Produtos</h2>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Produto</th>
                <th>Estoque</th>
                <th>Preço unitário (R$)</th>
                <th>Categoria</th>
                <th>Preço taxado (R$)</th>
                <th>Imagem</th>
                <th hidden>Ação</th>
              </tr>
            </thead>
            <tbody className="body">
              <tr>
                <td colSpan="7">
                  <button className="w-100" onClick={handleOpenProd}>
                    Adicionar Produto
                  </button>
                </td>
              </tr>
              {products.map((product) => (
                <ProdRow
                  key={product.code}
                  code={product.code}
                  name={product.name}
                  amount={product.amount}
                  uniPrice={product.price}
                  category={
                    categories.find((cat) => cat.code == product.category_code)
                      .name
                  }
                  taxPrice={product.taxed_price}
                  image={product.image}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default cadList;
