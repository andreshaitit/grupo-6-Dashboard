import { DatatableWrapper, TableBody, TableHeader } from "react-bs-datatable";
import { Col, Row, Table } from "react-bootstrap";

function Movie() {
	const body = [];
	const headers = [];
  return (
    <div className="px-4">
      {/*<!-- PRODUCTS LIST -->*/}
      <h1 className="h3 text-gray-800">Ultimos productos comprados</h1>

      {/*<!-- DataTales Example -->*/}
      <DatatableWrapper
        body={body}
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
