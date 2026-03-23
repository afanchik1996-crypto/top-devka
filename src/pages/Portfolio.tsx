import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export interface Video {
  title: string;
  platform: "YouTube" | "TikTok" | "Instagram" | "Vimeo";
  videoUrl: string;
  thumbnail: string;
  description: string;
  views?: string;
}

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS8od21iIwExpGbGdMYci9o8GcaxvAwwRF9jPdUFVihw9GBacUPial1h47yo7coTgONx5HGnUFYrrLH/pub?output=csv";

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

function csvToVideos(csvText: string): Video[] {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return {
      title: row.title || "",
      platform: (row.platform as Video["platform"]) || "YouTube",
      videoUrl: row.videoUrl || "",
      thumbnail: row.thumbnail || "",
      description: row.description || "",
      views: row.views || "",
    };
  });
}

export default function Portfolio() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Не удалось загрузить данные из Google Sheets");
        }
        return res.text();
      })
      .then((csvText) => {
        const parsedVideos = csvToVideos(csvText).filter(
          (video) => video.title && video.videoUrl
        );
        setVideos(parsedVideos);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Не удалось загрузить список видео");
        setLoading(false);
      });
  }, []);

  return (
    <div className="section portfolio-main" id="portfolio">
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

      {loading && <p className="portfolio-status">Загрузка видео...</p>}
      {error && (
        <p className="portfolio-status portfolio-status--error">{error}</p>
      )}

      {!loading && !error && (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={`${video.title}-${video.videoUrl}`} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
