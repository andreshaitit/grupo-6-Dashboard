import { DatatableWrapper, TableBody, TableHeader } from "react-bs-datatable";
import { Col, Row, Table } from "react-bootstrap";

function Movie({dataTable}) {
  const headers = [
    { title: "ID", prop: "id_product" },
    { title: "Nombre", prop: "name" },
    { title: "Unidades Vendidas", prop: "total_amount" },
    // {
    //   title: "Categoria",
    //   prop: "category",
    //   cell: (row) => (
    //     <span> {row.category === 1 ? "Admin" : "Comprador"} </span>
    //   ),
    // },
    // {
    //   title: "Acciones",
    //   prop: "button",
    //   cell: (row) => (
    //     <div>
    //       <button
    //         className="btn btn-warning mr-3"
    //         onClick={() =>
    //           navigate(`/agregar-usuario/`, { state: { data: row } } )
    //         }
    //       >
    //         Editar
    //       </button>
    //       <button
    //         className="btn btn-danger"
    //         onClick={() => deleteUser(row.userId)}
    //       >
    //         Eliminar
    //       </button>
    //     </div>
    //   ),
    // },
  ];
  return (
    <div className="px-4">
      {/*<!-- PRODUCTS LIST -->*/}
      <h1 className="h3 text-gray-800">Ultimos productos comprados</h1>

      {/*<!-- DataTales Example -->*/}
      <DatatableWrapper
        body={dataTable.products}
        headers={headers}
        paginationOptionsProps={{
          initialState: {
            rowsPerPage: 10,
            options: [5, 10, 15, 20],
          },
        }}
      >
        <Row>
          <Col className="col-12 mt-5">
            <Table className="table-bordered">
              <TableHeader />
              <TableBody />
            </Table>
          </Col>
        </Row>
      </DatatableWrapper>
    </div>
  );
}
export default Movie;
