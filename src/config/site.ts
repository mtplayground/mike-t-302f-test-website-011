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

export type PreviewTab = {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
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
  productPreview: {
    eyebrow: string;
    heading: string;
    subtext: string;
    tabs: PreviewTab[];
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
  productPreview: {
    eyebrow: 'Product preview',
    heading: 'See the agent team turn direction into delivery',
    subtext:
      'A GitHub-native workspace for planning, building, deploying, and operating production software while your repository stays the source of truth.',
    tabs: [
      {
        id: 'plan',
        label: 'Plan',
        description:
          'Convert founder direction into scoped implementation steps.',
        image: '/assets/product-preview.svg',
        imageAlt: 'myClawTeam planning workspace preview',
      },
      {
        id: 'build',
        label: 'Build',
        description:
          'Track code changes, review status, and delivery progress.',
        image: '/assets/product-preview.svg',
        imageAlt: 'myClawTeam build workspace preview',
      },
      {
        id: 'operate',
        label: 'Operate',
        description: 'Keep deployment and operating work visible in one flow.',
        image: '/assets/product-preview.svg',
        imageAlt: 'myClawTeam operations workspace preview',
      },
    ],
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
