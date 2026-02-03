"use client";
import React, { useState } from "react";
import locations from "../../../data/contact/locations.json";
import "./MapSection.scss";
import Image from "next/image";

const MapSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeMapUrl, setActiveMapUrl] = useState("");

  const handleOpenModal = (mapUrl) => {
    setActiveMapUrl(mapUrl); // Use the embed URL directly
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveMapUrl("");
  };

  return (
    <div className="mapsection">
      <div className="mapsection__container">
        <h2 className="mapsection__heading">Our Branches</h2>
        <div className="mapsection__row">
          {locations.map((loc, idx) => (
            <div className="mapsection__col" key={idx}>
              <div className="mapsection__card">
                <div
                  className="mapsection__circle-link"
                  onClick={() => handleOpenModal(loc.mapUrl)}
                  style={{ cursor: "pointer" }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View map for ${loc.city}`}
                  onKeyDown={e => { if (e.key === "Enter") handleOpenModal(loc.mapUrl); }}
                >
                  <div className="mapsection__circle">
                    <Image
                      src={loc.imageUrl}
                      alt={`${loc.city} location`}
                      className="mapsection__circle-image"
                      width={200}
                      height={200}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%"
                      }}
                    />
                  </div>
                </div>
                <h3 className="mapsection__city">{loc.city}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapSection;