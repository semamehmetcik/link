import React from 'react'
import PageHeader from '../components/common/page-header'
import Spacer from '../components/common/spacer'
import Library from '../components/library-page/library'






const MyLibraryPage = () => {
  return (
    <>
        <PageHeader title="Library"/>
        <Spacer/>
        <Library/>
        <Spacer/>

       
    </>
  )
}

export default MyLibraryPage;
