import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Maximize2 } from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemTitle,
  ItemFooter,
} from "@/components/ui/item";

export default function AsteroidsGame() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const gameUrl = import.meta.env.VITE_ASTEROIDS_URL;

  // Forces the iframe to reload, restarting python VM
  const handleHardReset = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleFocus = () => {
    if (iframeRef.current) {
      iframeRef.current.focus();
      setIsPlaying(true);
    }
  };

  return (
    <Item
      variant="outline"
      className="w-full max-w-5xl mx-auto my-8 shadow-2xl"
    >
      <ItemHeader className="flex flex-row items-center justify-between pb-2 ">
        <div className="space-y-1">
          <ItemTitle className="text-2xl text-primary font-bold tracking-tight">
            Sammy&apos;s Asteroids
          </ItemTitle>
          <p className="text-sm text-primary/80">
            Built with Pygame & Pygbag. Running via WebAssembly.
          </p>
        </div>
        <ItemActions>
          <Button
            variant="outline"
            size="sm"
            onClick={handleHardReset}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Hard Reset
          </Button>
        </ItemActions>
      </ItemHeader>

      <ItemContent className="p-0 bg-black relative aspect-video group">
        {/* Overlay to prompt user to click (helps with focus capturing) */}
        {!isPlaying && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 cursor-pointer transition-opacity group-hover:bg-black/40"
            onClick={handleFocus}
          >
            <Button size="lg" className="text-lg px-8 py-6 gap-3">
              <Maximize2 className="h-6 w-6" />
              Click to Start / Focus
            </Button>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={gameUrl}
          title="Sammy's Asteroids"
          className="w-full h-full border border-muted"
          // Allow full screen and audio
          allow="autoplay; fullscreen; gamepad; focus-without-user-activation"
          onLoad={() => console.log("Asteroids loaded")}
        />
      </ItemContent>

      <ItemFooter>
        <div className="text-sm text-primary/80 grid grid-cols-2 gap-4 w-full">
          <div className="text-left">
            <span className="font-semibold">Controls:</span>
            <ul className="list-disc list-inside mt-1">
              <li>WASD or HJKL to Move</li>
              <li>SPACE to Shoot</li>
            </ul>
          </div>
          <div className="text-right">
            <span className="font-semibold">Game State:</span>
            <ul className="list-disc list-inside mt-1 block">
              <li>If you crash, press 'R' to restart</li>
            </ul>
          </div>
        </div>
      </ItemFooter>
    </Item>
  );
}
