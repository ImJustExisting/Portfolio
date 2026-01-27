import style from "./styles/home.module.css";

export default function Home() {
  return (
    <>
      <div className={style.hero}>
        <div className={style.overlay}>
          <h1>Home</h1>

          <p>Hi, welcome to my portfolio. My name's Kaela</p>
          <p>I am a student at the Malta College of Arts, Science & Technology (MCAST), currently pursuing a Bachelors Degree (Bsc) with honors in Creative Computing.</p>
          <p>Take a look around to see some of my work!</p>
        </div>
      </div>
      
    </>
  );
}
