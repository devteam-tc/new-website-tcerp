import Image from 'next/image';

export default function IndustryBanner({ banner, altimg }) {
  return (
    <div className="project-banner-image position-relative mb-4 mb-lg-0 mt-2">
      <div className="zoom-out overflow-hidden" style={{ width: '100%', aspectRatio: '2/1' }}>
        <Image
          priority
          src={banner}
          width={1200}
          height={600}
          // `Industry banner showcasing ${title}`
          alt={altimg}
          className="img-fluid custom-banner-img"
          style={{
            width: '100%',
            height: '100%',
            objectPosition: 'center',
            borderRadius :'5px !important',
            transform :'none !important'
          }}
        />
      </div>
    </div>
  );
}
