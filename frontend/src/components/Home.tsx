import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemHeader,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import linkedin from "@/assets/linkedin.svg";
import github from "@/assets/github.svg";
import githubDark from "@/assets/githubDark.svg";
import { useTheme } from "@/components/theme-provider";
import AsteroidsGame from "@/components/Asteroids";

export default function Home() {
  const [gameLoaded, setGameLoaded] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const githubIcon = isDark ? github : githubDark;

  return (
    <div className="space-y-12">
      {/* Intro Section */}
      <section className="container max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          React + Bun + Go + Postgres
        </h1>
        <p className="text-xl text-muted-foreground">
          A full-stack showcase application demonstrating separate frontend and
          backend architecture...AND my Asteroids game!
        </p>
      </section>

      {/* Social links */}
      <TooltipProvider delayDuration={200}>
        <div className="flex justify-center gap-2">
          <SocialLinks
            src={githubIcon}
            alt="GitHub"
            href="https://github.com/kozykoding"
          />
          <SocialLinks
            src={linkedin}
            alt="LinkedIn"
            href="https://www.linkedin.com/in/samuel-lee-690891b4/"
          />
        </div>
      </TooltipProvider>

      {/* Navigation Cards */}
      <section className="container max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <Item variant="outline" asChild>
          <Link to="/health">
            <ItemContent>
              <ItemHeader>
                <ItemTitle>Go API Health Check</ItemTitle>
                <ItemDescription>
                  Test the connection between Go and React.
                </ItemDescription>
              </ItemHeader>
            </ItemContent>
          </Link>
        </Item>

        <Item variant="outline" asChild>
          <Link to="/todos">
            <ItemContent>
              <ItemHeader>
                <ItemTitle>Todo App</ItemTitle>
                <ItemDescription>
                  CRUD app using Postgres for persistence & Go.
                </ItemDescription>
              </ItemHeader>
            </ItemContent>
          </Link>
        </Item>

        <Item variant="outline" asChild>
          <Link to="/resume">
            <ItemContent>
              <ItemHeader>
                <ItemTitle>My Resume</ItemTitle>
                <ItemDescription>Work creds.</ItemDescription>
              </ItemHeader>
            </ItemContent>
          </Link>
        </Item>

        <Item variant="outline" asChild>
          <Link to="/certs">
            <ItemContent>
              <ItemHeader>
                <ItemTitle>Certifications</ItemTitle>
                <ItemDescription>Cert showcase.</ItemDescription>
              </ItemHeader>
            </ItemContent>
          </Link>
        </Item>
      </section>

      {/* Featured: The Game */}
      <section className="container max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl text-primary font-bold mb-2">
            Featured Project
          </h2>
          <p className="text-primary/80">
            Sammy&apos;s Python Asteroids. Have A... Blast!
          </p>
        </div>

        {/* No load until clicked */}
        {!gameLoaded ? (
          // 1. Show this lightweight placeholder first
          <div className="w-full max-w-5xl mx-auto my-8 border shadow-2xl rounded-xl overflow-hidden bg-black aspect-video flex flex-col items-center justify-center relative group">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 via-black to-black opacity-50" />

            <div className="z-10 text-center space-y-4">
              <h3 className="text-2xl font-bold text-primary">
                Ready to Play?
              </h3>
              <Button
                size="lg"
                onClick={() => setGameLoaded(true)}
                className="gap-2 text-lg px-8 py-6 transition-transform group-hover:scale-105"
              >
                <Play className="fill-current w-5 h-5" />
                Load Game
              </Button>
            </div>
          </div>
        ) : (
          // 2. Only render after the click
          <AsteroidsGame />
        )}
      </section>
    </div>
  );
}

// Helper component to reduce repetition
function SocialLinks({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* Use standard <a> tag for external links */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block" // Ensures hover effects work nicely
        >
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-20 w-20 p-2 transition-transform duration-300 hover:scale-125"
          />
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>{alt}</p>
      </TooltipContent>
    </Tooltip>
  );
}
