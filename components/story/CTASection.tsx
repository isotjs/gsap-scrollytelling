export function CTASection() {
  return (
    <section className="story-section cta-section" data-scene="cta">
      <div className="section-inner">
        <div className="section-copy" style={{ textAlign: "center" }}>
          <p className="section-eyebrow" data-animate="words">
            Ready For Your Next Drop
          </p>
          <h2 className="section-title" data-animate="words">
            Launch your first campaign in ThreadPilot this week.
          </h2>
          <p className="section-description" data-animate="words">
            Replace manual launch ops with one workflow built for t-shirt brands
            that move fast.
          </p>
          <div className="cta-actions">
            <button type="button" className="btn-primary" data-animate="rise">
              Start Free Trial
            </button>
            <button type="button" className="btn-secondary" data-animate="rise">
              Book Live Demo
            </button>
          </div>
          <div className="trust-strip" aria-label="trust indicators">
            <span className="trust-item" data-animate="words">2,400+ drops launched</span>
            <span className="trust-item" data-animate="words">99.96% uptime</span>
            <span className="trust-item" data-animate="words">4.9/5 brand satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
}
