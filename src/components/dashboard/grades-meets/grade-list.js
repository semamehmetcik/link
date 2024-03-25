import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getStudentInfoByPageForStudent } from "../../../api/student-info-service";

const GradeList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const loadData = async (page) => {
    setLoading(true);
    try {
      const resp = await getStudentInfoByPageForStudent(page, lazyState.rows);
      setList(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => {
    setlazyState(event);
  };

  useEffect(() => {
    loadData(lazyState.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyState]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Grade List</Card.Title>

          <DataTable
            value={list}
            lazy
            dataKey="id"
            paginator
            first={lazyState.first}
            rows={lazyState.rows}
            totalRecords={totalRows}
            onPage={onPage}
            loading={loading}
            tableStyle={{ minWidth: "100%" }}
            stripedRows
          >
            <Column field="lessonName" header="Lesson Name"></Column>
            <Column field="absentee" header="Absentee" />
            <Column field="midtermExam" header="Midterm Exam" />
            <Column field="finalExam" header="Final Exam" />
            <Column field="note" header="Note" />
            <Column field="infoNote" header="Message" />
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GradeList;