import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentRecord,
  setOperation,
} from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import { deleteManager, getManagersByPage } from "../../../api/manager-service";

const ManagerList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const { listRefreshToken } = useSelector((state) => state.misc);

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const onPage = (event) => {
    setlazyState(event);
  };

  const loadData = async (page) => {
    try {
      const resp = await getManagersByPage(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getFullName = (row) => {
    return `${row.name} ${row.surname}`;
  };

  const handleDelete = async (id) => {
    const resp = await swalConfirm("Are you sure to delete?");
    if (!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteManager(id);
      swalAlert("Manager was deleted", "success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    dispatch(setCurrentRecord(row));
    dispatch(setOperation("edit"));
  };

  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div>
        <Button className="btn-link" onClick={() => handleEdit(row)}>
          <FaEdit />
        </Button>
        <Button className="btn-link" onClick={() => handleDelete(row.id)}>
          <FaTimes />
        </Button>
      </div>
    );
  };

  const handleNewUser = () => {
    dispatch(setOperation("new"));
  };

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Manager List</span>
            <Button onClick={handleNewUser}>New Manager</Button>
          </Card.Title>

          <DataTable
            lazy
            dataKey="userId"
            value={list}
            paginator
            rows={lazyState.rows}
            totalRecords={totalRows}
            loading={loading}
            first={lazyState.first}
            onPage={onPage}
          >
            <Column body={getFullName} header="Name"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="phoneNumber" header="Phone Number"></Column>
            <Column field="ssn" header="SSN"></Column>
            <Column field="username" header="User Name"></Column>
            <Column
              body={getOperationButtons}
              headerStyle={{ width: "120px" }}
            ></Column>
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ManagerList;
