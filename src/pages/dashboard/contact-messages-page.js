import React from 'react'
import PageHeader from '../../components/common/page-header'
import Spacer from '../../components/common/spacer'
import ContactMessages from '../../components/dashboard/contact-messages/contact-message-list'

const ContactMessagesPage = () => {

  return (
    <>
      <PageHeader title="Contact Messages" />
      <Spacer />
      <ContactMessages />
      <Spacer />

    </>
  )
}

export default ContactMessagesPage