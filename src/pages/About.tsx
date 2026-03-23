export default function About() {
  return (
    <div className="section">
      <div className="section-heading">
        <p className="section-kicker">О себе</p>
        <h2>Создаю видео, которые удерживают внимание</h2>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>Что я делаю</h3>
          <p>
            Монтирую короткие и длинные видео для брендов, блогеров, экспертов и
            медиа-проектов.
          </p>
        </div>

        <div className="about-card">
          <h3>Навыки</h3>
          <p>
            Adobe Premiere Pro, After Effects, DaVinci Resolve, sound design,
            motion elements, титры, цветокоррекция.
          </p>
        </div>

        <div className="about-card">
          <h3>Подход</h3>
          <p>
            Делаю акцент на темпе, драматургии кадра, удержании внимания и
            визуальной подаче под конкретную платформу.
          </p>
        </div>
      </div>
    </div>
  );
}
