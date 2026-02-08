import React from "react";
import { HeroLink } from "./Navbar";

const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-white/5 z-0">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        {/* Brand */}
        <div className="col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <HeroLink />
          </div>

          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            The intelligence layer for your modern development stack. Scalable,
            secure, and futuristic.
          </p>

          <div className="flex gap-4">
            <SocialIcon icon="terminal" />
            <SocialIcon icon="public" />
            <SocialIcon icon="mail" />
          </div>
        </div>

        {/* Links */}
        <FooterColumn
          title="Product"
          links={["Features", "Integrations", "Pricing", "Changelog"]}
        />
        <FooterColumn
          title="Company"
          links={["About Us", "Careers", "Blog", "Press"]}
        />
        <FooterColumn
          title="Legal"
          links={["Privacy", "Terms", "Security", "Compliance"]}
        />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 pt-10 border-t border-white/5">
        <p className="text-white/20 text-xs">
          © 2024 TGEN Automation Inc. All rights reserved.
        </p>
        <p className="text-white/20 text-xs">
          Designed for the future of engineering.
        </p>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  links: string[];
};

const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white font-bold text-sm uppercase tracking-widest">
        {title}
      </p>

      {links.map((link) => (
        <a
          key={link}
          href="#"
          className="text-white/40 hover:text-white text-sm transition-colors"
        >
          {link}
        </a>
      ))}
    </div>
  );
};

type SocialIconProps = {
  icon: string;
};

const SocialIcon = ({ icon }: SocialIconProps) => {
  return (
    <a
      href="#"
      className="size-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
    >
      <span className="material-symbols-outlined text-sm">{icon}</span>
    </a>
  );
};

export default Footer;
