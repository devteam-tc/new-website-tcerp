"use client";

import dynamic from "next/dynamic";
import React from "react";

const ModulePage = dynamic(() => import("./ModulePage"));

const ModulePageClientWrapper = ({ slug }) => {
  return <ModulePage slug={slug} />;
};

export default ModulePageClientWrapper;
