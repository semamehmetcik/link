
import Spacer from "../../components/common/spacer";
import PageHeader from "../../components/common/page-header";
import {  useSelector } from "react-redux";
import MeetList from "../../components/dashboard/meet-management/meet-list";
import NewMeetForm from "../../components/dashboard/meet-management/new-meet-form";
import EditMeetForm from "../../components/dashboard/meet-management/edit-meet-form";


const MeetManagementPage = () => {
  const { currentOperation } = useSelector(state => state.misc);
  
  return <>
    <PageHeader title="Meet Management"/>
    <Spacer/>
     {currentOperation==="new" && <><NewMeetForm/><Spacer/></> }
     {currentOperation==="edit" && <><EditMeetForm/><Spacer/></> }

    
    <MeetList/>
    <Spacer/>
  </>;
};

export default MeetManagementPage;