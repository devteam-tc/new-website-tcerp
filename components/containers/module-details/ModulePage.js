'use client';

import React from 'react';
import PageHeader from '../../layout/PageHeader';
import Footer from '../../layout/footer/Footer';
import Header from '../../layout/header/Header';
import CustomCursor from '../../layout/CustomCursor';
import FaqSection from '../modules/FaqSection';
import { FaHome } from 'react-icons/fa';
import VideoSection from '../modules/VideoSection';
import CtaSection from '../modules/CtaSection';
import WorkProcessSection from '../../containers/modules/WorkProcessSection'

const ModulePage = ({ slug, initialData }) => {
  const moduleData = initialData;

  const breadcrumbs = [
    { label: 'Home', link: '/', icon: FaHome },
    { label: 'All Modules', link: '/all-modules' },
    { label: moduleData?.mainHeaderSection?.heading || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), link: null },
  ];
  
  return (
    <>
      <Header />
      <PageHeader 
        title={moduleData?.mainHeaderSection?.heading || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} 
        breadcrumbs={breadcrumbs} 
      />
      <WorkProcessSection slug={slug} />
      <VideoSection slug={slug} />
      <FaqSection slug={slug} />
      <CtaSection />
      <Footer />
      <CustomCursor />
    </>
  );
};

export default ModulePage;
