import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getMeetsByStudent } from "../../../api/meet-service";

const MeetList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const loadData = async () => {
    setLoading(true);
    try {
      const resp = await getMeetsByStudent();
      setList(resp);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Meet List</Card.Title>

          <DataTable
            value={list}
            dataKey="id"
            loading={loading}
            tableStyle={{ minWidth: "100%" }}
            stripedRows
          >
            <Column field="date" header="Date"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="End Time"></Column>
            <Column field="description" header="Description"></Column>
          </DataTable>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MeetList;