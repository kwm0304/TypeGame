import { getGameText } from "@/services/gameTextService";
import { useEffect, useState } from "react";

const SinglePlayer = () => {
  const [text, setText] = useState<string>("");
  useEffect(() => {
    const fetchText = async () => {
      try {
        const gameText = await getGameText();
        const cleaned = gameText.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
        setText(cleaned);
      }
      catch (error) {
        console.error(error); 
    }
  }
    fetchText();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-monkeyBG">
      <div className="w-full flex items-center justify-center text-monkeyDarkText pb-44 px-48 font-reddit-mono text-3xl font-semibold track-wide leading-loose">
        {text}
      </div>
    </div>
  );
};

export default SinglePlayer;
