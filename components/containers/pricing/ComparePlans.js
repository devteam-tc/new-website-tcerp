'use client';
import { useState } from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import comparisonData from '../../../data/pricing/comparison.json';

const Checkmark = () => (
  <span className="checkmark" aria-label="Included">✔</span>
);

const ComparePlans = () => {
  const { title, plans, features } = comparisonData;
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const renderFeatureCell = (plan, featureKey) => {
    const value = plan.features[featureKey];
    
    if (value === true) return <Checkmark />;
    if (value === false) return <span aria-label="Not included">—</span>;
    return <span>{value}</span>;
  };

  return (
    <Container fluid className="comparePlans">
      <Row className="justify-content-center">
        <Col xs={12} className="text-center">
          <h2>
            <span>{title.main}</span>
            {title.sub}
          </h2>
          <p>{title.description}</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12}>
          <div className="table-responsive">
            <Table className="comparison-table" hover>
              <thead>
                <tr>
                  <th className="feature-column">Features and Services</th>
                  {plans.map((plan, i) => (
                    <th key={i} className="text-center">
                      <h3>{plan.name}</h3>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr 
                    key={idx}
                    onMouseEnter={() => setHoveredFeature(feature.key)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <td className="feature-column">
                      {feature.label}
                      {feature.description && hoveredFeature === feature.key && (
                        <div className="feature-tooltip">
                          {feature.description}
                        </div>
                      )}
                    </td>
                    {plans.map((plan, i) => (
                      <td key={i} className="text-center">
                        {renderFeatureCell(plan, feature.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ComparePlans;