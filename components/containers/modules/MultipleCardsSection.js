import { Layers, Lock, Link, Database } from 'lucide-react';
import { useEffect, useState } from 'react';
import './MultipleCardsSection.scss';

const MultipleCardsSection = ({ slug }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      import(`../../../data/modules/${slug}.json`)
        .then((moduleData) => {
          console.log('Successfully loaded cards data for:', slug);
          setData(moduleData.default);
        })
        .catch((err) => {
          console.error('Failed to load module data:', err);
          setError(err);
        });
    }
  }, [slug]);

  if (error) {
    console.error('Error in MultipleCardsSection:', error);
    return null;
  }

  if (!data || !data.cards) {
    return null;
  }

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="multiple-cards-section__icon" />;
      case 'Lock':
        return <Lock className="multiple-cards-section__icon" />;
      case 'Link':
        return <Link className="multiple-cards-section__icon" />;
      case 'Database':
        return <Database className="multiple-cards-section__icon" />;
      default:
        return <Layers className="multiple-cards-section__icon" />;
    }
  };

  return (
    <section className="multiple-cards-section">
      <div className="multiple-cards-section__container">
        <h1 className="multiple-cards-section__headline">
          {data.cards.headline.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h1>
        <div className="multiple-cards-section__grid">
          {data.cards.cards.map((card, index) => (
            <div key={index} className="multiple-cards-section__card">
              <div className="multiple-cards-section__card-icon">
                {getIconComponent(card.icon)}
              </div>
              <h3 className="multiple-cards-section__card-title">{card.title}</h3>
              <p className="multiple-cards-section__card-desc">{card.description}</p>
            </div>
          ))}
        </div>
        <div className="multiple-cards-section__cta">
          <button className="multiple-cards-section__button">{data.cards.buttonText}</button>
        </div>
      </div>
    </section>
  );
};

export default MultipleCardsSection;