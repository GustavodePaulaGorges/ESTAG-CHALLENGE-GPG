function catRow({code, name, tax}) {
  return (
    <>
      <tr>
        <td>{code}</td>
        <td>{name}</td>
        <td>{tax}</td>
      </tr>
    </>
  );
}
export default catRow
