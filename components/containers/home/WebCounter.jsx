"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function WebCounter() {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    let count = localStorage.getItem("page_view");

    if (!count) {
      localStorage.setItem("page_view", "1");
      setVisitCount(1);
    } else {
      count = Number(count);
      if (sessionStorage.getItem("visited") !== "true") {
        let newCount = count + 1;
        localStorage.setItem("page_view", newCount.toString());
        setVisitCount(newCount);
        sessionStorage.setItem("visited", "true");
      } else {
        setVisitCount(count);
      }
    }

    const script = document.createElement("script");
    script.src =
      "https://counter4.optistats.ovh/private/counter.js?c=mrebw8fzxe67tffcqaz2edns2r349ldg&down=async";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 992px) {
          .web-counter-container {
            display: none !important;
          }
        }
      `}</style>

      <div className="web-counter-container flex flex-col items-center justify-center mt-5">
        <div id="sfcmrebw8fzxe67tffcqaz2edns2r349ldg"></div>
        <noscript>
          <a
            href="https://www.freecounterstat.com"
            title="visitor counters"
          >
            <img
              src="https://counter4.optistats.ovh/private/freecounterstat.php?c=mrebw8fzxe67tffcqaz2edns2r349ldg"
              border="0"
              title="visitor counters"
              alt="visitor counters"
            />
          </a>
        </noscript>
      </div>
    </>
  );
}
