import Image from 'next/image';
import cloudIcon from '../../../public/images/industry-icons/checkmark-icon.svg';

export default function IndustryDescription({ title, description, keyPoints }) {
  return (
    <>
      <div>
        <h1 className="title split-text right py-2">{title}</h1>
        <p className="lead">{description}</p>
      </div>
      <div className="inner-options">
        <ul className="list-unstyled py-2">
          {keyPoints?.map((point, index) => (
            <div key={index} style={{display: "flex", gap: "10px", alignItems: "start", justifyContent: "left"}}>
              <div>
                <Image 
                  src={cloudIcon} 
                  alt={`Bullet point arrow for ${point}`}
                  width={20}
                  height={20}
                />
              </div>
              <li>{point}</li>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
