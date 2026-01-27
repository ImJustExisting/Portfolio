import style from "./styles/about.module.css";

export default function About() {
  return (
    <>
      <main className={style.about}>
      <section className={style.hero}>
        <h1 className={style.title}>About Me</h1>

      <p className={style.aboutME}>
        I’m Kaela Whelen, a front-end developer in progress with a strong focus
        on designing eye catching, attention grabbing applications. I am to
        really understand my client, delivering a product that resonates with
        them with every pixel.
      </p>

      <p className={style.aboutME}>
        Currently, I am studying Creative Computing at MCAST, where I am honing
        my skills in web development, user experience design, and interactive
        media. I am passionate about creating engaging digital experiences that
        captivate users and leave a lasting impression. 
        
        Within the past 3 years I have both worked and studied in the ICT industry, 
        gaining skills in both front-and-back-end development and design. 
        
      </p>

      <h3 className={style.CTA}>
        Feel free to explore my portfolio to see some of my projects and get in
        touch if you'd like to collaborate!
      </h3>
      </section>
      
      <section className={style.skills}>
        <h2>Skills and Tools</h2>
        <div className={style.grid}>
          <div className={style.card}>
            <h3>Front-end</h3>
            <p>React, TypeScript, Vite, Vue, HTML, CSS, Tailwind CSS</p>
          </div>

          <div className={style.card}>
            <h3>Back-end</h3>
            <p>Firebase / Firestore, Javascript, JSON, C# & Python</p>
          </div>

        </div>
      </section>
      </main>
    </>
  );
}
