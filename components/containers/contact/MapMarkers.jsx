"use client";
import React , { useEffect,  useState , useRef } from "react";

const MapMarkers = () => {

  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAxMtzzipvLVRrXSqtoaVCFy2Ywm9X5Tko&callback=initMap";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      window.initMap = initMap;
    };

    if (!window.google) {
      loadGoogleMaps();
    } else {
      initMap();
    }

    function initMap() {
      const locations = [
        { lat: 17.447342, lng: 78.386427, name: "Hyderabad, Telangana" },
        { lat: 11.023765, lng: 77.005325, name: "Coimbatore, Tamilnadu" },
        { lat: 13.023398, lng: 80.207697, name: "Chennai, TamilNadu" },
        { lat: 22.751765, lng: 75.896715, name: "Indore, Madhya Pradesh" },
      ];

      const map = new google.maps.Map(mapRef.current, {
        zoom: 5,
        center: locations[0],
      });

      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: location.name,
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div style="color: green; font-size: 14px; font-weight: bold; padding: 5px; background: white; border-radius: 5px; text-align: center;">${location.name}</div>`,
          disableAutoPan: true,
        });

        marker.addListener("mouseover", function () {
          infowindow.open(map, marker);
        });

        marker.addListener("mouseout", function () {
          infowindow.close();
        });
      });
    }
  }, []);



  
  return (
    <>
         <div className="contact-map mt-5" ref={mapRef} style={{ height: "630px", width: "100%" }}></div>
    </>
  );
};

export default MapMarkers;
