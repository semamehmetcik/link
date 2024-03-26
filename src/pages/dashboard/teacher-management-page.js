import React from "react";
import Spacer from "../../components/common/spacer";
import PageHeader from "../../components/common/page-header";
import { useSelector } from "react-redux";
import NewTeacherForm from "../../components/dashboard/teacher-management/new-teacher-form";
import EditTeacherForm from "../../components/dashboard/teacher-management/edit-teacher-form";
import TeacherList from "../../components/dashboard/teacher-management/teacher-list";

const TeacherManagementPage = () => {
  const { currentOperation } = useSelector(state => state.misc);

  return <>
    <PageHeader title="Teacher Management"/>
    <Spacer/>
    {currentOperation==="new" && <><NewTeacherForm/><Spacer/></> }
    {currentOperation==="edit" && <><EditTeacherForm/><Spacer/></> }
    
    <TeacherList/>
    <Spacer/>
  </>;
};

export default TeacherManagementPage;