import logo from '@/images/logo.png';
import { Copyright } from 'lucide-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type FooterProps = object;

const menuItems = [
  {
    title: 'Product',
    links: [
      { text: 'Overview', url: '#' },
      { text: 'Pricing', url: '#' },
      { text: 'Marketplace', url: '#' },
      { text: 'Features', url: '#' },
      { text: 'Integrations', url: '#' },
      { text: 'Pricing', url: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { text: 'About', url: '#' },
      { text: 'Team', url: '#' },
      { text: 'Blog', url: '#' },
      { text: 'Careers', url: '#' },
      { text: 'Contact', url: '#' },
      { text: 'Privacy', url: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { text: 'Help', url: '#' },
      { text: 'Sales', url: '#' },
      { text: 'Advertise', url: '#' },
    ],
  },
  {
    title: 'Social',
    links: [
      { text: 'Twitter', url: '#' },
      { text: 'Instagram', url: '#' },
      { text: 'LinkedIn', url: '#' },
    ],
  },
];

const bottomLinks = [
  { text: 'Terms and Conditions', url: '#' },
  { text: 'Privacy Policy', url: '#' },
];

const Footer: FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  const handleBackHome = () => (window.location.href = window.location.origin);

  return (
    <footer className="px-10 pt-20 pb-10 md:px-50 mt-30 shadow-sm bg-card">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        <div className="col-span-2 mb-8 lg:mb-0">
          <div className="flex items-center gap-2 lg:justify-start">
            <img
              src={logo}
              alt="logo"
              className="w-60 h-auto cursor-pointer"
              onClick={handleBackHome}
            />
          </div>
          <p className="mt-3 text-lg text-muted-foreground">Votre boutique de sport en ligne</p>
        </div>
        {menuItems.map((section, sectionIdx) => (
          <div key={sectionIdx}>
            <h3 className="mb-4 font-bold">{section.title}</h3>
            <ul className="text-muted-foreground space-y-4">
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary font-medium">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
        <span className="flex items-center gap-2 text-foreground">
          Kikoff.ch <Copyright size={14} /> {currentYear}
        </span>
        <ul className="flex gap-4">
          {bottomLinks.map((link, linkIdx) => (
            <li key={linkIdx} className="hover:text-primary underline">
              <a href={link.url}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export { Footer };
