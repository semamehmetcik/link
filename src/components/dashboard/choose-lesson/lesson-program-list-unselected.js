import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import {
  setListRefreshToken,
} from "../../../store/slices/misc-slice";
import { swalAlert, swalConfirm } from "../../../helpers/functions/swal";
import {
  getAllLessonPrograms,
} from "../../../api/lesson-program-service";
import { chooseLesson } from "../../../api/student-service";
import ButtonLoader from "../../common/button-loader";

const LessonProgramListUnselected = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const resp = await getAllLessonPrograms();
      setList(resp);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getLessonNames = (row) => {
    return row.lessonName.map((item) => item.lessonName).join("-");
  };

  const getTeacherNames = (row) => {
    return row.teachers.map((item) => `${item.name} ${item.surname}`).join("-");
  };

  const handleSelect = async () => {
    setLoading(true);

    try {
      if (selectedPrograms.length <= 0)
        throw new Error("Select at least a program");

      const payload = {
        lessonProgramId: selectedPrograms.map((item) => item.lessonProgramId.toString())
      } 

      const data = await chooseLesson(payload);
      swalAlert("Program assignment was completed");
      dispatch(setListRefreshToken(Math.random()));
    } catch (err) {
      console.log(err);
      const errMsg = err?.response?.data?.message || err?.message;
      swalAlert(errMsg, "error");
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <span>Unassigned Program List</span>
          </Card.Title>

          <DataTable
            dataKey="lessonProgramId"
            value={list}
            loading={loading}
            selection={selectedPrograms}
            onSelectionChange={(e) => setSelectedPrograms(e.value)}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "40px" }}
            ></Column>
            <Column body={getLessonNames} header="Lesson Name"></Column>
            <Column body={getTeacherNames} header="Teacher"></Column>
            <Column field="day" header="Day"></Column>
            <Column field="startTime" header="Start Time"></Column>
            <Column field="stopTime" header="End Time"></Column>
          </DataTable>

          <div className="mt-4 text-center">
            <Button onClick={handleSelect} disabled={loading}>
              {loading && <ButtonLoader/>} Select
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LessonProgramListUnselected;