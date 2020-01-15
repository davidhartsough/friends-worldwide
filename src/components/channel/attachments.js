import React from "react"
import ContentLoader from "./content-loader"
import "./attachments.css"

export default ({ attachments }) => (
  <div className="attachments">
    {attachments.map(
      ({
        title,
        video_html,
        audio_html,
        image_url,
        original_url,
        thumb_url,
        text,
      }) => (
        <div key={title + original_url} className="attachment">
          <p>
            <a
              className="attachment-link"
              href={original_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title ? title : original_url}
            </a>
          </p>
          {text && text.length > 0 && <p className="attachment-text">{text}</p>}
          <div className="attachment-content">
            {video_html ? (
              <ContentLoader
                html={video_html
                  .replace("&autoplay=1", "")
                  .replace("autoplay=1&", "")}
                type="video"
              />
            ) : audio_html ? (
              <ContentLoader html={audio_html} type="audio" />
            ) : image_url ? (
              <img src={image_url} alt={title} />
            ) : thumb_url ? (
              <img src={thumb_url} alt={title} />
            ) : null}
          </div>
        </div>
      )
    )}
  </div>
)
