'use client';
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Dynamically import WOW.js
import DataBg from "../elements/DataBg";
import Breadcrumb from "./Breadcrumb";
import SearchPopup from "./SearchPopup";
import Link from "next/link";

// Ensure WOW.js is loaded properly
const loadWOW = async () => {
    if (typeof window !== "undefined") {
        const WOW = (await import("wowjs")).default;
        new WOW({ live: false }).init();
    }
};

export default function Layout({ breadcrumbTitle, children, wrapperCls }) {
    const [isPopup, setPopup] = useState(false);
    const handlePopup = () => setPopup(!isPopup);

    useEffect(() => {
        loadWOW(); // ✅ Properly load WOW.js dynamically
    }, []);

    return (
        <>
            <DataBg />
            <div className={`page-wrapper ${wrapperCls || ""}`} id="top">
                <SearchPopup isPopup={isPopup} handlePopup={handlePopup} />
                {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
                {children}
            </div>
        </>
    );
}
