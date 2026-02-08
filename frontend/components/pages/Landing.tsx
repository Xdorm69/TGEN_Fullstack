import Image from "next/image";
import MaxWidthWrapper from "../wrappers/MaxWidthWrapper";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Brain, LaptopIcon, ShieldCheck, Zap } from "lucide-react";
import Footer from "../Footer";

export default function HeroPage() {
  return (
    <>
      <MaxWidthWrapper>
        <section className="relative py-16 h-150">
          <HeroGlow />
          <HeroContent />
          <HeroOrb />
        </section>

        <TrustedSection />
        <FeatureSection />
      </MaxWidthWrapper>
      <Footer />
    </>
  );
}

const HeroGlow = () => {
  return (
    <div className="absolute z-0 left-20 top-1/2 -translate-y-1/2 h-[40vh] w-[30vw] blur-3xl bg-primary/20" />
  );
};

const HeroContent = () => {
  return (
    <div className="relative z-10 top-1/2 -translate-y-1/2">
      <TopLiveBanner />

      <h1 className="mt-8 hero-text">
        Automate The <br /> Future of Work
      </h1>

      <p className="font-mono text-sm text-muted-foreground mt-4 mb-8 w-1/2">
        With AI-powered test generation, you can create tests in seconds, saving
        you time and effort.
      </p>

      <div className="flex gap-4">
        <Button className="text-white">Get Started</Button>
        <Button variant="outline">Watch Demo</Button>
      </div>
    </div>
  );
};

const TopLiveBanner = () => {
  return (
    <div className="w-fit rounded-full py-1 px-4 border bg-card/40 border-primary/30 text-primary">
      <p className="uppercase text-sm font-sans">🚀 Next Gen AI 2.0 is Live</p>
    </div>
  );
};

type CircleProps = {
  size: number;
  border: string;
  children: React.ReactNode;
};

const Circle = ({ size, border, children }: CircleProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 ${border}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
};

const HeroOrb = () => {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2">
      <Circle size={490} border="border-primary/20">
        <Circle size={430} border="border-primary/30">
          <Circle size={370} border="border-primary/50">
            <Circle size={320} border="border-primary/80">
              <div className="relative flex items-center justify-center">
                <div className="p-6 rounded-full bg-primary/30 border-2 border-primary">
                  <Image
                    src="/hero-image.png"
                    alt="Hero Image"
                    width={220}
                    height={220}
                  />
                </div>
              </div>
            </Circle>
          </Circle>
        </Circle>
      </Circle>
    </div>
  );
};

const TrustedSection = () => {
  const companies = ["Voxis", "Lumina", "Prism", "Core", "Nexus"];
  return (
    <section className="py-16">
      <MaxWidthWrapper>
        <div className="flex items-center flex-col">
          <h1 className="font-xl text-muted-foreground/80 font-sans uppercase font-semibold">
            Trusted by World's Most Innovative Teams
          </h1>
          <div className="mt-8 flex gap-8">
            {companies.map((company, index) => (
              <div key={index}>
                <h1 className="text-muted-foreground/50 font-bold font-sans text-4xl tracking-tighter">
                  {company}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast Setup",
      description:
        "Integrate into your stack in less than 5 minutes with our native CLI tools.",
    },
    {
      icon: Brain,
      title: "AI Automation",
      description:
        "Leverage cutting-edge LLMs to automate high-level decision making.",
    },
    {
      icon: ShieldCheck,
      title: "Secure and Scalable",
      description:
        "Enterprise-grade SOC2 compliance that grows with your organization.",
    },
    {
      icon: LaptopIcon,
      title: "Cross Device",
      description:
        "Manage your automation pipeline from mobile, tablet, or desktop.",
    },
  ];

  return (
    <section className="py-16">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center">
          <div>
            <h1
              className={
                "text-6xl font-sans tracking-tighter font-semibold text-center bg-linear-to-r from-white to-white/20 text-transparent bg-clip-text"
              }
            >
              Powerful Features
            </h1>
            <p className="mt-2 font-mono text-muted-foreground/80 w-md text-center">
              Everything you need to scale your automation infrastructure
              without the complexity.
            </p>
          </div>

          {/* GRID  */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
            {features.map((i) => (
              <Card key={i.title}>
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <i.icon className="size-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-sans tracking-tight">
                    {i.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {i.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
