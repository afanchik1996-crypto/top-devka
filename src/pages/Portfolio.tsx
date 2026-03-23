import { videos } from "../data/videos";
import VideoCard from "../components/VideoCard";

export default function Portfolio() {
  return (
    <div className="section">
      <div className="portfolio-hero">
        <h1>
          Примеры моих
          <br />
          работ
        </h1>
        <p>
          Монтаж под YouTube, Reels, TikTok и другие платформы. Могу вести ваш
          канал.
        </p>
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.title} video={video} />
        ))}
      </div>
    </div>
  );
}
