import Image from 'next/image';

export default function InfoCards({ infoCards }) {
  return (
    <section className="info-cards">
      <div className="row g-4 two-info-cards">
        {infoCards?.map((card, index) => (
          <div className="col-md-6" key={index}>
            <div className="info-card h-100">
              <div className="icon mb-4">
                <Image
                  src={card.image}
                  alt={`${card.title || 'Info Card'} icon`}
                  width={100}
                  height={100}
                  style={{
                    width: '50%',
                    height: 'auto',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = '/images/industries/default-card-image.png'
                  }}
                />
              </div>
              <h4>{card.title}</h4>
              {card.description && (
                <p>{card.description}</p>
              )}
              {card.list && (
                <ul className="list-unstyled">
                  {card.list.map((item, idx) => (
                    <li key={idx} className="d-flex align-items-start gap-2">
                      <Image
                        src="/images/industry-icons/checkmark-icon.svg"
                        alt={`${item} feature checkmark`}
                        width={20}
                        height={20}
                        style={{ flexShrink: 0, marginTop: '3px' }}
                      />
                      <h5 className="card-point mb-0">{item}</h5>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
