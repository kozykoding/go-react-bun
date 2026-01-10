import React from "react";

export default function ResumePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 print:px-4 print:py-4 bg-background text-foreground">
      {/* Header - Centered for better balance */}
      <header className="mb-8 border-b pb-6 text-center">
        <h1 className="text-primary text-4xl font-bold tracking-tight">
          Samuel Lee
        </h1>
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground font-medium">
          <span>Software Engineer</span>
          <span>•</span>
          <span>Backend Developer</span>
          <span>•</span>
          <span>Systems Administrator</span>
        </div>
        {/*Reserve for adding in subheader later*/}
        {/*<div className="mt-2 text-sm text-muted-foreground">
          sammy@kozykoding.com | Sacramento, CA
        </div>*/}
      </header>

      {/* Summary - Full Width */}
      <section className="mb-10">
        <SectionHeading className="mb-3">Professional Profile</SectionHeading>
        <p className="text-foreground/90 text-[15px] leading-relaxed max-w-4xl">
          Backend‑focused Software Engineer with a specialized background in
          internal full‑stack applications, REST APIs, and automated data
          pipelines. Expertise in Python, Go, and SQL, complemented by deep
          systems administration knowledge (Linux/Windows, Virtualization,
          Networking). Proven track record of reducing operational overhead
          through in-house SaaS tools and maintaining 100% audit compliance in
          highly regulated environments.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[240px,1fr]">
        {/* Technical Stack */}
        <aside className="space-y-8">
          <div>
            <SectionHeading className="mb-3">Core Skills</SectionHeading>
            <div className="flex flex-wrap gap-1.5">
              {[
                "Go",
                "Python",
                "SQL",
                "PostgreSQL",
                "Kubernetes",
                "Git",
                "Docker",
                "Linux",
                "React/Next.js",
              ].map((s) => (
                <span
                  key={s}
                  className="bg-secondary/50 text-secondary-foreground rounded border px-2 py-0.5 text-[11px] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading className="mb-3">Technical Toolkit</SectionHeading>
            <div className="space-y-4 text-xs leading-tight">
              <div>
                <h4 className="font-semibold text-primary mb-1">
                  Backend & Data
                </h4>
                <p className="text-muted-foreground">
                  Python, Go, SQL Server, PostgreSQL, SQLite, REST APIs, ETL
                  Pipelines.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">
                  Infrastructure
                </h4>
                <p className="text-muted-foreground">
                  Proxmox VE, Docker, pfSense, Ubiquiti, Hyper-V, VLANs, Arch
                  Linux.
                </p>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading className="mb-3">Education</SectionHeading>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-bold">BS, Business Mgmt</div>
                <div className="text-muted-foreground text-xs">
                  Univ. of Phoenix
                </div>
              </div>
              <div>
                <div className="font-bold">AS, Database Admin</div>
                <div className="text-muted-foreground text-xs">
                  American River College
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main - Experience */}
        <section className="space-y-8">
          <SectionHeading>Work Experience</SectionHeading>

          <Job
            role="Junior Software Engineer / Backend Developer"
            company="The Gun Range"
            duration="June 2023 – Nov 2025"
            bullets={[
              "Developed internal SaaS tools using Python, SQL, and Next.js, automating staff management and inventory tracking.",
              "Architected centralized SQL reporting schemas, consolidating disparate data into real-time KPI dashboards.",
              "Maintained 100% compliance for CA DOJ/ATF federal audits through automated data validation and reporting scripts.",
              "Engineered automated ETL pipelines in Python, reducing manual reporting effort and data discrepancies.",
            ]}
          />

          <Job
            role="Founder / Full Stack Developer"
            company="Shinigami LLC / Ripples Events"
            duration="Oct 2020 – June 2023"
            bullets={[
              "Optimized PostgreSQL databases for high-concurrency inventory tracking and CRM operations.",
              "Integrated real-time inventory tracking via 3rd-party APIs, significantly reducing stockout occurrences.",
              "Automated business intelligence reporting for trend forecasting using SQL and Python.",
            ]}
          />

          <Job
            role="Business Analyst"
            company="Centene Corporation"
            duration="Jan 2019 – Sept 2020"
            bullets={[
              "Reduced manual data processing by 60% through Python-based automation and SQL query optimization.",
              "Designed executive Tableau/Looker dashboards for real-time monitoring of operational service levels.",
              "Analyzed multi-million record datasets to identify operational cost-saving opportunities.",
            ]}
          />

          <SectionHeading>Certifications & Projects</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="border rounded-lg p-3">
              <h4 className="font-bold text-primary">Go Development</h4>
              <ul className="mt-1 text-xs text-muted-foreground list-disc ml-4">
                <li>HTTP Servers & Clients Cert</li>
                <li>RSS Feed & Blog Aggregator Project</li>
                <li>Concurrent Web Scraper Project</li>
              </ul>
            </div>
            <div className="border rounded-lg p-3">
              <h4 className="font-bold text-primary">Python & AI</h4>
              <ul className="mt-1 text-xs text-muted-foreground list-disc ml-4">
                <li>OOP Certification</li>
                <li>AI Agent Framework Project</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        @media print {
          @page { margin: 0.4in; }
          body { -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
      `}</style>
    </main>
  );
}

/* Helper Components */

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={`text-primary text-xs font-bold tracking-widest uppercase border-b border-primary/20 pb-1 ${className}`}
    >
      {children}
    </h3>
  );
}

function Job({
  role,
  company,
  duration,
  bullets,
}: {
  role: string;
  company: string;
  duration: string;
  bullets: string[];
}) {
  return (
    <div>
      <div className="flex justify-between items-start flex-wrap gap-2">
        <div>
          <h4 className="text-[16px] font-bold text-foreground leading-tight">
            {role}
          </h4>
          <div className="text-primary font-medium text-sm">{company}</div>
        </div>
        <div className="text-right md:text-right text-xs">
          <div className="font-semibold text-foreground">{duration}</div>
        </div>
      </div>
      <ul className="mt-3 ml-4 list-disc space-y-1.5 text-[13.5px]">
        {bullets.map((b, i) => (
          <li key={i} className="text-foreground/80 pl-1">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
