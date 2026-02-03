import Error from "../components/containers/Error"
import Footer from '../components/layout/footer/Footer';
import Header from '../components/layout/header/Header';
import PageHeader from '../components/layout/PageHeader';
import React from 'react';


const page = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: '404', link: null }
  ];
  return (
    <>
      <Header/>
      <PageHeader title="Page Not Found" breadcrumbs={breadcrumbs}/>
      <Error/>
      <Footer/>
    </>
  )
}

export default page