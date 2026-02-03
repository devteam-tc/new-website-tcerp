'use client';

import WorldMapWithMarkers from "./WorldMapWithMarkers";

const locations = [
  { name: 'Hyderabad', lat:  17.3850, lng: 78.4867 },
  { name: 'Chennai', lat: 13.0827, lng:  80.2707 },
  { name: 'Coimbatore', lat:  11.0168, lng: 76.9558 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714},
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  { name: 'Kochi', lat: 9.9312, lng: 76.2673 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', lat: 28.6139, lng: 77.2090},
  { name: 'Vizag', lat:  17.6868, lng: 83.2185 }
];

// Convert latitude and longitude to image coordinates
const convertCoordinates = (lat, lng) => {
  // Adjusted bounding box for better fit with the map image
  const minLat = 6.5;    // Slightly below southern tip
  const maxLat = 36.0;   // Slightly above northern border
  const minLng = 67.0;   // Slightly west of western border
  const maxLng = 98.0;   // Slightly east of eastern border
  
  // Calculate the position as a percentage with some skew adjustment
  // Adding non-linear scaling for better visual fit
  const x = Math.pow((lng - minLng) / (maxLng - minLng), 0.95) * 100;
  // Invert the y-axis and add vertical adjustment
  const y = 100 - Math.pow(((lat - minLat) / (maxLat - minLat)), 1.1) * 100;
  
  // City-specific adjustments for better visual alignment
  let offsetX = 0;
  let offsetY = 0;
  
  if (lat > 24) offsetY -= 2;    // North India adjustment
  if (lng > 85) offsetX += 2;    // East India adjustment
  if (lng < 75) offsetX -= 1;    // West India adjustment
  if (lat < 15 && lng < 80) offsetY += 2; // South-West adjustment
  
  return {
    x: Math.min(93, Math.max(7, x + offsetX)), // Keep within 7-93% of container
    y: Math.min(93, Math.max(7, y + offsetY))
  };
};

export default function Integration() {
  return (
    <section className="integration-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <WorldMapWithMarkers/>
          </div>
          <div className="col-md-6">
            <div className="text-area ps-md-4">
              <h1 className="integration-title">Our Presence Across World</h1>
              <p className="integration-description">
              Tech Cloud ERP empowers growing businesses across regions through a strong and dedicated partner network. We deliver reliable, cloud-based ERP solutions tailored for manufacturers, traders, and service providers. Whether your goal is to streamline operations or boost productivity, Tech Cloud ERP is your trusted partner for driving business growth and efficiency.
              </p>
              {/* <a href="/locations" className="button">Learn More</a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
