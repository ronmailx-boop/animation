import { Composition } from "remotion";
import { Film } from "./Film";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition id="YomPijamot" component={Film} durationInFrames={30 * 30} fps={30} width={1080} height={1920} />
  );
};
