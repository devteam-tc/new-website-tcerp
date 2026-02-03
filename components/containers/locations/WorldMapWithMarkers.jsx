"use client"; // Add this at the top

import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { IoLocationSharp } from "react-icons/io5";
import  "./WorldMapWithMarkers.scss";


const WorldMapWithMarkers = () => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");
    root._logo.dispose();

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "rotateY",
      projection: am5map.geoOrthographic(),
      paddingBottom: 20,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      rotationX: 78.5,
      rotationY: -20,
      zoomLevel: 1.0
    }));

    setTimeout(() => {
      chart.animate({
        key: "rotationX",
        from: chart.get("rotationX"),
        to: chart.get("rotationX") + 360,
        duration: 15000,
        loops: Infinity,
        easing: am5.ease.linear
      });
    }, 500);

    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: worldLow
    }));

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
      fill: am5.color(0x05a7cc),
      strokeWidth: 1,
      cursorOverStyle: "pointer"
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0xef5226),
      strokeWidth: 2,
      stroke: am5.color(0xb33e1d),
      shadowColor: am5.color(0xEF52264D),
      shadowBlur: 10,
      shadowOffsetX: 3,
      shadowOffsetY: 3
    });

    polygonSeries.data.setAll([
      {
        id: "IN",
        fill: am5.color(0xfde5de),
        stroke: am5.color(0x0000ff),
        strokeWidth: 2
      }
    ]);
    let graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
    graticuleSeries.mapLines.template.setAll({
      strokeOpacity: 0.1,
      stroke: root.interfaceColors.get("alternativeBackground")
    });

    let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeries.bullets.push(() => {
      let icon = am5.Graphics.new(root, {
        svgPath: IoLocationSharp({}).props.children[0].props.d,
        scale: 0.04,
        tooltipText: "{title}\n{address}",
        fill: am5.color(0xfde5de)
      });
      return am5.Bullet.new(root, { sprite: icon });
    });

    const locations = [
      { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, address: 'Hyderabad, Telangana, India' },
      { name: 'Chennai', lat: 13.0827, lng: 80.2707, address: 'Chennai, Tamil Nadu, India' },
      { name: 'Coimbatore', lat: 11.0168, lng: 76.9558, address: 'Coimbatore, Tamil Nadu, India' },
      { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, address: 'Ahmedabad, Gujarat, India' },
      { name: 'Bangalore', lat: 12.9716, lng: 77.5946, address: 'Bangalore, Karnataka, India' },
      { name: 'Kolkata', lat: 22.5726, lng: 88.3639, address: 'Kolkata, West Bengal, India' },
      { name: 'Kochi', lat: 9.9312, lng: 76.2673, address: 'Kochi, Kerala, India' },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777, address: 'Mumbai, Maharashtra, India' },
      { name: 'Delhi', lat: 28.6139, lng: 77.2090, address: 'New Delhi, India' },
      { name: 'Vizag', lat: 17.6868, lng: 83.2185, address: 'Visakhapatnam, Andhra Pradesh, India' },
      { name: 'Dubai', lat: 25.2048, lng: 55.2708, address: 'Dubai, United Arab Emirates' },
      { name: 'Bahrain', lat: 26.0667, lng: 50.5577, address: 'Bahrain' },
      { name: 'UAE', lat: 25.2048, lng: 55.2708, address: 'UAE' },
      { name: 'Kuwait', lat: 25.2048, lng: 55.2708, address: 'Kuwait' },
      { name: 'Qatar', lat: 25.2048, lng: 55.2708, address: 'Qatar' },
      { name: 'Oman', lat: 25.2048, lng: 55.2708, address: 'Oman' },
      { name: 'USA', lat: 25.2048, lng: 55.2708, address: 'USA' },

    ];

    pointSeries.data.setAll(
      locations.map(location => ({
        title: location.name,
        address: location.address,
        geometry: {
          type: 'Point',
          coordinates: [location.lng, location.lat]
        }
      }))
    );

    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <Container fluid className="containerFluid">
      <Row className="rowCentered">
        <Col md={12} className="colResponsive">
          <div id="chartdiv" className="chartContainer" />
        </Col>
      </Row>
    </Container>
  );
};

export default WorldMapWithMarkers;
