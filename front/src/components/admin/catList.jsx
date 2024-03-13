import CatRow from "./catRow";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/actions/setCategory";

function cadList({ categories }) {
  const { currentCategory } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  const handleOpenCategory = () => {
    dispatch(setCategory(!currentCategory));
  };

  return (
    <>
      <div className="w-40">
        <h2>Listagem de Categorias</h2>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Taxa (%)</th>
                <th hidden>Ação</th>
              </tr>
            </thead>
            <tbody className="body">
              <tr>
                <td colSpan="7">
                  <button className="w-100" onClick={handleOpenCategory}>
                    Adicionar Categoria
                  </button>
                </td>
              </tr>
              {categories.map((category) => (
                <CatRow
                  key={category.code}
                  code={category.code}
                  name={category.name}
                  tax={category.tax}
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
