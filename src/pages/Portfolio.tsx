import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export interface Video {
  title: string;
  platform: "YouTube" | "TikTok" | "Instagram" | "Like" | "VK";
  videoUrl: string;
  thumbnail: string;
  description: string;
  views?: string;
}

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS8od21iIwExpGbGdMYci9o8GcaxvAwwRF9jPdUFVihw9GBacUPial1h47yo7coTgONx5HGnUFYrrLH/pub?output=csv";

const STORAGE_KEY = "portfolio_videos_cache";

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function normalizePlatform(value: string): Video["platform"] {
  const normalized = value.trim().toLowerCase();

  if (normalized === "youtube") return "YouTube";
  if (normalized === "tiktok") return "TikTok";
  if (normalized === "instagram") return "Instagram";
  if (normalized === "like") return "Like";
  if (normalized === "vk") return "VK";

  return "YouTube";
}

function csvToVideos(csvText: string): Video[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]).map((header) =>
    header.replace(/^\uFEFF/, "").trim()
  );

  return lines
    .slice(1)
    .map((line) => {
      const values = parseCsvLine(line);
      const row: Record<string, string> = {};

      headers.forEach((header, index) => {
        row[header] = (values[index] ?? "").trim();
      });

      return {
        title: row.title || "",
        platform: normalizePlatform(row.platform || ""),
        videoUrl: row.videoUrl || "",
        thumbnail: row.thumbnail || "",
        description: row.description || "",
        views: row.views || "",
      };
    })
    .filter((video) => video.title && video.videoUrl);
}

function preloadImages(videos: Video[]) {
  videos.slice(0, 6).forEach((video) => {
    if (!video.thumbnail) return;
    const img = new Image();
    img.src = video.thumbnail;
  });
}

function PortfolioSkeleton() {
  const fakePlatforms = [
    "YouTube",
    "TikTok",
    "Instagram",
    "VK",
    "Like",
    "YouTube",
  ];

  return (
    <div className="video-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="video-card skeleton-card">
          <div className="video-thumb-wrap skeleton-thumb">
            <div className="video-overlay">
              <span className="play-btn skeleton-play">▶</span>
            </div>
          </div>

          <div className="video-info">
            <div className="video-topline">
              <span className="platform-badge skeleton-badge">
                {fakePlatforms[index]}
              </span>
              <span className="views skeleton-text">•••</span>
            </div>

            <h3 className="skeleton-title">Загрузка видео...</h3>
            <p className="skeleton-desc">
              Подготавливаем карточки портфолио для отображения
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cached = localStorage.getItem(STORAGE_KEY);

    if (cached) {
      try {
        const parsedCache = JSON.parse(cached) as Video[];
        if (Array.isArray(parsedCache) && parsedCache.length > 0) {
          setVideos(parsedCache);
        }
      } catch (e) {
        console.error("Ошибка чтения кэша:", e);
      }
    }

    const controller = new AbortController();

    async function loadVideos() {
      try {
        setError("");

        const res = await fetch(SHEET_CSV_URL, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Не удалось загрузить данные из Google Sheets");
        }

        const csvText = await res.text();
        const parsedVideos = csvToVideos(csvText);

        setVideos(parsedVideos);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedVideos));
        preloadImages(parsedVideos);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        console.error(err);

        const hasCache = localStorage.getItem(STORAGE_KEY);
        if (!hasCache) {
          setError("Не удалось загрузить список видео");
        }
      }
    }

    loadVideos();

    return () => controller.abort();
  }, []);

  const showGrid = videos.length > 0;
  const showSkeleton = !showGrid && !error;

  return (
    <div className="section portfolio-main">
      <div className="portfolio-hero">
        <h1>
          Видео, которые
          <br />
          цепляют внимание
        </h1>
        <p>
          Монтаж под YouTube, Reels, TikTok и рекламу. Динамика, ритм,
          визуальный стиль и вовлечение с первых секунд.
        </p>
      </div>

      {showSkeleton && <PortfolioSkeleton />}

      {error && (
        <p className="portfolio-status portfolio-status--error">{error}</p>
      )}

      {showGrid && (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={`${video.title}-${video.videoUrl}`} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
