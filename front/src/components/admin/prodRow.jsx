function prodRow({code, name, amount, uniPrice, category, taxPrice, image}) {
  return (
    <>
      <tr>
        <td>#{code}</td>
        <td>{name}</td>
        <td>{amount}</td>
        <td>{uniPrice}</td>
        <td>{category}</td>
        <td>{taxPrice}</td>
        <td>
          <div className="dropdown">
            <img
              src={image}
              className="ProductImg"
            ></img>
            <div className="dropdown-content">
              <img
                src={image}
                className="ProdImgExpanded"
              ></img>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
export default prodRow;
