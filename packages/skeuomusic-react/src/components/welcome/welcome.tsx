import { useNavigate } from "@tanstack/react-router";
import SlideToUnlock from "../slide-to-unlock/slide-to-unlock";
import musicIcon from "./music.svg";

export default function Welcome() {
  const navigate = useNavigate({ from: "/" });
  return (
    <>
      <img
        className="music-icon"
        style={{ marginBottom: "2rem" }}
        height={256}
        src={musicIcon}
        alt="skeuomusic"
      />
      <SlideToUnlock onUnlock={() => navigate({ to: "/music/library" })} />
    </>
  );
}
