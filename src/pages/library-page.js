import React from 'react'
import PageHeader from '../components/common/page-header'
import Spacer from '../components/common/spacer'
import Library from '../components/library-page/library-page'

const LibraryPage = () => {
  return (
    <>
        <PageHeader title="Courses"/>
        <Spacer/>
        <Library/>
        <Spacer/>
    </>
  )
}

export default LibraryPage