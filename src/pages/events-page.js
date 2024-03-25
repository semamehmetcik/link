import React from 'react'
import PageHeader from '../components/common/page-header'
import Spacer from '../components/common/spacer'
import Events from '../pages/events-page'

const EventsPage = () => {
  return (
    <>
        <PageHeader title="Events"/>
        <Spacer/>
        <Events/>
        <Spacer/>
    </>
  )
}

export default EventsPage