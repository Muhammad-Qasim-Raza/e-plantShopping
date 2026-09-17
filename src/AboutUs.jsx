export default function AboutUs() {
  const values = [
    {
      number: "01",
      title: "Our Mission",
      text: "Make beautiful, healthy houseplants easier to discover and bring into everyday spaces.",
    },
    {
      number: "02",
      title: "Our Vision",
      text: "Create a greener generation of homes where nature and modern living belong together.",
    },
    {
      number: "03",
      title: "Our Promise",
      text: "Thoughtful selection, clear information, and a shopping experience designed around you.",
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-shell">
        <div className="section-kicker">ABOUT PARADISE NURSERY</div>

        <div className="about-heading">
          <h2>
            Plants that make
            <span> spaces feel alive.</span>
          </h2>
          <p>
            Paradise Nursery is a modern plant shop built around one simple
            idea: the right plant can change the atmosphere of an entire room.
          </p>
        </div>

        <div className="about-grid">
          {values.map((value) => (
            <article className="value-card" key={value.number}>
              <span>{value.number}</span>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>

        <div className="about-footer">
          <div>
            <span className="mini-label">THE PARADISE STANDARD</span>
            <h3>Less noise. More nature.</h3>
          </div>
          <p>
            From statement plants to easy-care companions, every collection is
            organized to help you find something that fits your space and your
            lifestyle.
          </p>
        </div>
      </div>
    </section>
  );
}
