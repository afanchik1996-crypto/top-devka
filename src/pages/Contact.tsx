export default function Contact() {
  return (
    <div className="section" id="contact">
      <div className="section-heading">
        <span className="section-kicker">Контакты</span>
        <h2>Связаться со мной</h2>
        <p>Открыта к сотрудничеству, монтажу роликов и новым проектам.</p>
      </div>

      <div className="contact-links">
        <a
          href="https://vk.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card vk-card"
        >
          <div className="contact-card__icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.785 17s.268-.03.405-.18c.125-.137.12-.394.12-.394s-.017-1.203.54-1.38c.55-.174 1.255 1.162 2.003 1.676.566.39.995.305.995.305l1.998-.028s1.045-.065.55-.888c-.04-.067-.286-.602-1.473-1.703-1.243-1.153-1.076-.967.421-2.963.912-1.215 1.277-1.957 1.163-2.275-.108-.303-.774-.223-.774-.223l-2.249.014s-.167-.023-.291.05c-.122.07-.2.234-.2.234s-.356.95-.83 1.76c-1 1.707-1.4 1.798-1.563 1.694-.38-.245-.285-.983-.285-1.507 0-1.638.248-2.322-.484-2.5-.243-.06-.423-.1-1.046-.106-.798-.008-1.473.002-1.855.188-.254.124-.45.401-.33.417.149.02.486.091.664.334.23.314.221 1.02.221 1.02s.132 1.928-.307 2.168c-.302.165-.717-.172-1.607-1.724-.456-.795-.8-1.675-.8-1.675s-.066-.154-.184-.236c-.145-.1-.35-.132-.35-.132L4.51 9.02s-.337.01-.461.157c-.11.13-.01.399-.01.399s1.76 4.118 3.754 6.188C9.622 17.653 11.706 17 11.706 17h1.079z" />
            </svg>
          </div>
          <div className="contact-card__content">
            <span>VK</span>
            <p>Написать во ВКонтакте</p>
          </div>
        </a>

        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card tg-card"
        >
          <div className="contact-card__icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21.944 4.665c.315-.204.624.077.522.476l-3.19 15.015c-.076.36-.482.52-.778.308l-4.85-3.5-2.472 2.38c-.237.228-.635.094-.684-.231l-.723-4.785L18.93 6.03c.204-.183-.02-.5-.27-.38L6.63 11.38l-4.613-1.44c-.403-.126-.456-.676-.084-.876L21.944 4.665z" />
            </svg>
          </div>
          <div className="contact-card__content">
            <span>Telegram</span>
            <p>Связаться в Telegram</p>
          </div>
        </a>

        <a
          href="https://hh.ru/resume/yourresume"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card hh-card"
        >
          <div className="contact-card__icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 3h3v7h6V3h3v18h-3v-8H9v8H6V3z" />
            </svg>
          </div>
          <div className="contact-card__content">
            <span>HeadHunter</span>
            <p>Посмотреть резюме</p>
          </div>
        </a>
      </div>
    </div>
  );
}
