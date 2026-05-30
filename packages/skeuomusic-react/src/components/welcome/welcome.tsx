import SlideToUnlock from "../slide-to-unlock/slide-to-unlock";
import musicIcon from "./music.svg";

export default function Welcome() {
  return (
    <>
      <img className="music-icon" style={{ marginBottom: "2rem" }} height={256} src={musicIcon} />
      <SlideToUnlock onUnlock={() => console.log("welcome")} />
    </>
  );
}
