import React from "react";
import Spacer from "../../components/common/spacer";
import PageHeader from "../../components/common/page-header";
import { useSelector } from "react-redux";
import StudentInfoList from "../../components/dashboard/student-info-management/student-info-list";
import NewStudentInfoForm from "../../components/dashboard/student-info-management/new-student-info-form";
import EditStudentInfoForm from "../../components/dashboard/student-info-management/edit-student-info-form";

const StudentInfoManagementPage = () => {
  const { currentOperation } = useSelector(state => state.misc);

  return <>
    <PageHeader title="Student Info Management"/>
    <Spacer/>
     {currentOperation==="new" && <><NewStudentInfoForm/><Spacer/></> }
     {currentOperation==="edit" && <><EditStudentInfoForm/><Spacer/></> }

    
    <StudentInfoList/>
    <Spacer/>
  </>;
};

export default StudentInfoManagementPage;