import SlideToUnlock from "../slide-to-unlock/slide-to-unlock";

export default function Welcome() {
  return (
    <>
      <h1>Skeuomusic</h1>
      <SlideToUnlock onUnlock={() => console.log("welcome")} />
    </>
  );
}
