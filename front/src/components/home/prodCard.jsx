function prodCard({name, price, image}) {
  return (
    <>
      <div className="ProdCard">
        <img
          className="ProdImg"
          src={image}
        ></img>
        <div className="ProdInfo">
          <span className="prodName">{name}</span>
          <span>R$ {price}</span>
          <span className="invisible text">Quantidade:</span>
          <input className="invisible input"></input>
          <button className="invisible button">Adicionar</button>
        </div>
      </div>
    </>
  );
}

export default prodCard