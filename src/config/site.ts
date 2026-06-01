export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type FooterGroup = {
  title: string;
  links: CtaLink[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export type SiteAssets = {
  logo: string;
  productPreview: string;
  icons: {
    arrowRight: string;
    discord: string;
    x: string;
  };
};

export type SiteConfig = {
  name: string;
  description: string;
  assets: SiteAssets;
  nav: NavItem[];
  ctas: {
    primary: CtaLink;
    secondary: CtaLink;
  };
  social: {
    discord: SocialLink;
    x: SocialLink;
  };
  contact: {
    email: string;
    mailto: `mailto:${string}`;
  };
  footer: {
    groups: FooterGroup[];
    legal: CtaLink[];
  };
};

export const siteConfig = {
  name: 'myClawTeam',
  description: 'Static website for myClawTeam.',
  assets: {
    logo: '/assets/logo.svg',
    productPreview: '/assets/product-preview.svg',
    icons: {
      arrowRight: '/assets/icons/arrow-right.svg',
      discord: '/assets/icons/discord.svg',
      x: '/assets/icons/x.svg',
    },
  },
  nav: [
    { label: 'Products', href: '#products' },
    { label: 'Features', href: '#features' },
    { label: 'Community', href: '#community' },
    { label: 'Contact', href: '#contact' },
  ],
  ctas: {
    primary: { label: 'Get Started', href: '#contact' },
    secondary: { label: 'View Product', href: '#products' },
  },
  social: {
    discord: {
      label: 'Discord',
      href: 'https://example.com/myclawteam-discord',
      icon: '/assets/icons/discord.svg',
    },
    x: {
      label: 'X',
      href: 'https://example.com/myclawteam-x',
      icon: '/assets/icons/x.svg',
    },
  },
  contact: {
    email: 'hello@example.com',
    mailto: 'mailto:hello@example.com',
  },
  footer: {
    groups: [
      {
        title: 'Product',
        links: [
          { label: 'Products', href: '#products' },
          { label: 'Features', href: '#features' },
          { label: 'Get Started', href: '#contact' },
        ],
      },
      {
        title: 'Community',
        links: [
          { label: 'Discord', href: 'https://example.com/myclawteam-discord' },
          { label: 'X', href: 'https://example.com/myclawteam-x' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Contact', href: '#contact' },
          { label: 'Email', href: 'mailto:hello@example.com' },
        ],
      },
    ],
    legal: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
    ],
  },
} satisfies SiteConfig;
