import { useNavigate } from "@tanstack/react-router";
import SlideToUnlock from "../slide-to-unlock/slide-to-unlock";
import musicIcon from "./music.svg";

export default function Welcome() {
  const navigate = useNavigate({ from: "/" });
  return (
    <main id="unlock-container">
      <img id="unlock-logo" height={256} src={musicIcon} alt="skeuomusic" />
      <SlideToUnlock
        onUnlock={() =>
          navigate({
            to: "/music/library/artists",
            viewTransition: { types: ["unlock"] },
          })
        }
      />
    </main>
  );
}
