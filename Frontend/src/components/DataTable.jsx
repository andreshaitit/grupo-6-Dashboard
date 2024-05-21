import "bootstrap/dist/css/bootstrap.css";
import { Button, Col, Row, Table } from "react-bootstrap";
import {
  DatatableWrapper,
  Filter,
  Pagination,
  PaginationOptions,
  TableBody,
  TableColumnType,
  TableHeader,
} from "react-bs-datatable";
import { useNavigate } from "react-router";

const DataTable = ({ titleTable, textBtnAdd, body, headers, linkBtnAdd }) => {
  const navigate = useNavigate();
  return (
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
      <Row className="m-5">
        <Col className="col-4">
          {/* <Filter /> */}
          <h1>{titleTable}</h1>
        </Col>
        <Col className="offset-4 col-2">
          <button className="btn btn-primary" onClick={()=>navigate(linkBtnAdd)}>{textBtnAdd}</button>
        </Col>
        <Col className="col-2">
          <PaginationOptions />
        </Col>
        <Col className="col-12 mt-5">
          <Table className="table-bordered">
            <TableHeader />
            <TableBody />
          </Table>
        </Col>
        <Col className="items-center offset-4 col-4 mt-5">
          <Pagination />
        </Col>
      </Row>
    </DatatableWrapper>
  );
};

export default DataTable;
