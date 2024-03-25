import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FaEdit, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRecord, setListRefreshToken, setOperation } from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import { deleteMeet, getMeetsByPage } from "../../../api/meet-service";

const MeetList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const dispatch = useDispatch();
  const { listRefreshToken } = useSelector(state=> state.misc);
  
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
      const resp = await getMeetsByPage(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getStudents = (row) => {
    return row.students.map(student=> `${student.name} ${student.surname}`).join("-");
  };

  const handleDelete = async (id) => { 
    const resp = await swalConfirm("Are you sure to delete?")  ;
    if(!resp.isConfirmed) return;
    setLoading(true);
    try {
      await deleteMeet(id);
      dispatch(setListRefreshToken(Math.random()));
      swalAlert("Meet was deleted", "success");
    } catch (err) {
      console.log(err)
    }
    finally{
      setLoading(false);
    }

  }

  const handleEdit = (row) => { 
    dispatch(setCurrentRecord(row));
    dispatch(setOperation("edit"));
  }

  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div>
        <Button className="btn-link" onClick={()=> handleEdit(row)}>
          <FaEdit />
        </Button>
        <Button className="btn-link" onClick={()=> handleDelete(row.id)}>
          <FaTimes />
        </Button>
      </div>
    );
  };

  const handleNewUser = () => { 
    dispatch(setOperation("new"));
  }


  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line
  }, [lazyState, listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Meet List</span>
            <Button onClick={handleNewUser}>New Meet</Button>
          </Card.Title>

          <DataTable
            lazy
            dataKey="id"
            value={list}
            paginator
            rows={lazyState.rows}
            totalRecords={totalRows}
            loading={loading}
            first={lazyState.first}
            onPage={onPage}

          >
            <Column field="date" header="Date"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="End Time"></Column>
            <Column field="description" header="Description"></Column>
            <Column body={getStudents} header="Students"></Column>
            <Column body={getOperationButtons} headerStyle={{width: "120px"}}></Column>
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MeetList;