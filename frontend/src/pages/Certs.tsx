import pythoncert from "@/assets/pythoncert.png";
import aiagentcert from "@/assets/aiagent_certificate.png";
import linuxcert from "@/assets/linux_certificate.png";
import gohttp from "@/assets/gohttpclients_cert.png";
import gohttpserver from "@/assets/gohttpserver_cert.png";
import gocert from "@/assets/go_certificate.png";
import sqlcert from "@/assets/sql_certificate.png";
import oopcert from "@/assets/OOP_certificate.png";
import coe from "@/assets/coe.jpg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CertsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 border-b pb-4">
        <h1 className="text-primary text-3xl font-bold tracking-tight">
          My Certifications
        </h1>
        <p className="text-muted-foreground mt-2">
          As of December 2025. There&apos;s more to come!
        </p>
      </div>

      <TooltipProvider delayDuration={200}>
        <div className="mx-auto grid w-full grid-cols-1 md:grid-cols-2 gap-8">
          <CertItem src={gocert} alt="Go Certification" />
          <CertItem src={gohttpserver} alt="Go HTTP Servers Certification" />
          <CertItem src={gohttp} alt="Go HTTP Clients Certification" />
          <CertItem src={pythoncert} alt="Python Certification" />
          <CertItem src={aiagentcert} alt="AI Agent Certification" />
          <CertItem src={linuxcert} alt="Linux Certification" />
          <CertItem
            src={oopcert}
            alt="Object Oriented Programming Certification"
          />
          <CertItem src={sqlcert} alt="SQL Certification" />
          <CertItem src={coe} alt="CA DOJ COE" />
        </div>
      </TooltipProvider>
    </div>
  );
}

// Helper component to reduce repetition
function CertItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden text-card-foreground shadow-lg">
      <Tooltip>
        <TooltipTrigger asChild>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="h-auto w-full object-contain p-2 transition-transform duration-300 hover:scale-[1.02]"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{alt}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
