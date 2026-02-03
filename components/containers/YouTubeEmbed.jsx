const YouTubeEmbed = ({ embedId }) => {
  return (
    <>
      <iframe
        width="200"
        height="100"
        src={`https://www.youtube.com/embed/${embedId}`}
        data-allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube"
        className="video"
      />
    </>
  );
};

export default YouTubeEmbed;
