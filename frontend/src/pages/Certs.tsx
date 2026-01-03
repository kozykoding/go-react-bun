import pythoncert from "@/assets/pythoncert.png";
import aiagentcert from "@/assets/aiagent_certificate.png";
import linuxcert from "@/assets/linux_certificate.png";
import gohttp from "@/assets/gohttpclients_cert.png";
import goscraper from "@/assets/goscraper_certificate.png";
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
        <h2 className="text-primary text-3xl text-center font-bold tracking-tight">
          Go Certifications
        </h2>
      </div>

      <TooltipProvider delayDuration={200}>
        {/* Changed from grid to flex */}
        <div className="flex flex-wrap justify-center gap-4">
          <CertItem src={gocert} alt="Go Certification" />
          <CertItem src={gohttpserver} alt="Go HTTP Servers Certification" />
          <CertItem src={gohttp} alt="Go HTTP Clients Certification" />
        </div>
      </TooltipProvider>

      <div className="mt-12 mb-8 border-b pb-4">
        <h2 className="text-primary text-3xl text-center font-bold tracking-tight">
          Python Certifications
        </h2>
      </div>
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-wrap justify-center gap-4">
          <CertItem src={pythoncert} alt="Python Certification" />
          <CertItem
            src={oopcert}
            alt="Object Oriented Programming Certification"
          />
        </div>
      </TooltipProvider>

      <div className="mt-12 mb-8 border-b pb-4">
        <h2 className="text-primary text-3xl text-center font-bold tracking-tight">
          Other Certifications
        </h2>
      </div>
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-wrap justify-center gap-4">
          <CertItem src={linuxcert} alt="Linux Certification" />
          <CertItem src={sqlcert} alt="SQL Certification" />
        </div>
      </TooltipProvider>

      <div className="mt-12 mb-8 border-b pb-4">
        <h2 className="text-primary text-3xl text-center font-bold tracking-tight">
          Projects
        </h2>
      </div>
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-wrap justify-center gap-4">
          <CertItem src={goscraper} alt="Go Web Scraper Project" />
          <CertItem src={aiagentcert} alt="AI Agent Project" />
        </div>
      </TooltipProvider>

      <div className="mt-12 mb-8 border-b pb-4">
        <h2 className="text-primary text-3xl text-center font-bold tracking-tight">
          Miscellaneous Certs
        </h2>
      </div>
      <TooltipProvider delayDuration={200}>
        <div className="flex flex-wrap justify-center gap-4">
          <CertItem src={coe} alt="CA DOJ COE" />
        </div>
      </TooltipProvider>
    </div>
  );
}

function CertItem({ src, alt }: { src: string; alt: string }) {
  return (
    /* 
       Added w-full and md:max-w-[calc(33.333%-1rem)] 
       For 3-column grid on desktop 
       but remain centered when there are only 1 or 2.
    */
    <div className="w-full md:max-w-[400px] overflow-hidden text-card-foreground shadow-lg flex justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-auto object-contain p-2 transition-transform duration-300 hover:scale-[1.05]"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{alt}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
