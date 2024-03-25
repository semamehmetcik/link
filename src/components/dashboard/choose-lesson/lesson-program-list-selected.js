import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { getAllLessonProgramsByStudent } from "../../../api/lesson-program-service";

const LessonProgramListSelected = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { listRefreshToken } = useSelector(state=> state.misc);
  

  const loadData = async () => {
    try {
      const resp = await getAllLessonProgramsByStudent();
      setList(resp);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


 
  const getLessonNames = (row) => { 
    return row.lessonName.map(item=> item.lessonName).join("-")
   }

   const getTeacherNames = (row) => { 
    return row.teachers.map(item=> `${item.name} ${item.surname}`).join("-")
   }



  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Assigned Program List</span>
          </Card.Title>

          <DataTable
            lazy
            dataKey="lessonProgramId"
            value={list}
            loading={loading}
          >
            <Column body={getLessonNames} header="Lesson Name"></Column>
            <Column body={getTeacherNames} header="Teacher"></Column>
            <Column field="day" header="Day"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="End Time"></Column>
          </DataTable>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonProgramListSelected;