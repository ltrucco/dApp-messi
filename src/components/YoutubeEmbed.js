import React from "react";
import PropTypes from "prop-types";


const YoutubeEmbed = ({ embedId }) => (
  <>
    <div className="video-responsive">
      <iframe
        width="853"
        autofocus="true"
        height="480"
        id='videoYoutube'
        src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        // onLoad={() => document.getElementById("videoYoutube").focus()}
      />
    </div>
    <iframe allowfullscreen="" frameborder="0" height="500" src={`https://www.youtube.com/live_chat?v=${embedId}&embed_domain=messi.finance`} width="600"></iframe>
  </>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;