import React from "react";
import Spacer from "../../components/common/spacer";
import PageHeader from "../../components/common/page-header";
import GradeList from "../../components/dashboard/grades-meets/grade-list";
import MeetList from "../../components/dashboard/grades-meets/meet-list";

const GradeMeetPage = () => {
  
  return <>
    <PageHeader title="Grades & Meets"/>    
    <Spacer/>
    <GradeList/>
    <Spacer/>
    <MeetList/>
    <Spacer/>
  </>;
};

export default GradeMeetPage;