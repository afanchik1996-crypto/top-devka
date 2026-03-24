interface Video {
  title: string;
  platform: "YouTube" | "TikTok" | "Instagram" | "Like" | "VK";
  videoUrl: string;
  thumbnail: string;
  description: string;
  views?: string;
}

interface Props {
  video: Video;
}

export default function VideoCard({ video }: Props) {
  return (
    <a
      href={video.videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="video-card"
      aria-label={`Открыть видео: ${video.title}`}
    >
      <div className="video-thumb-wrap">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-thumb"
          loading="lazy"
        />
        <div className="video-overlay">
          <span className="play-btn">▶</span>
        </div>
      </div>

      <div className="video-info">
        <div className="video-topline">
          <span className="platform-badge">{video.platform}</span>
          {video.views && <span className="views">{video.views}</span>}
        </div>

        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </a>
  );
}
