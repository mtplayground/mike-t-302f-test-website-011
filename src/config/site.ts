export type NavItem = {
  label: string;
  href: `#${string}`;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type SocialChannel = 'discord' | 'x';

export type CommunityCard = {
  title: string;
  blurb: string;
  ctaLabel: string;
  social: SocialChannel;
};

export type FooterGroup = {
  title: string;
  links: CtaLink[];
};

export type FeatureCard = {
  title: string;
  blurb: string;
  icon: string;
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
  social: Record<SocialChannel, SocialLink>;
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
  features: {
    eyebrow: string;
    heading: string;
    subtext: string;
    cards: FeatureCard[];
  };
  community: {
    eyebrow: string;
    heading: string;
    subtext: string;
    cards: CommunityCard[];
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
  features: {
    eyebrow: 'Built exclusively for founders',
    heading: 'A full SDLC agent team in your repository',
    subtext:
      'myClawTeam is shaped around founder-speed software delivery: clear direction in, owned production code out.',
    cards: [
      {
        title: 'SDLC automation',
        blurb:
          'myClawTeam turns founder direction into plans, branches, pull requests, and shipped increments without scattering work across tools.',
        icon: '/assets/icons/feature-sdlc.svg',
      },
      {
        title: 'Security-aware delivery',
        blurb:
          'Security review, dependency choices, and deployment posture stay visible as part of the same delivery flow.',
        icon: '/assets/icons/feature-security.svg',
      },
      {
        title: 'Full code ownership',
        blurb:
          'Every artifact lands in your repository, so your team keeps the code, history, and production path under its control.',
        icon: '/assets/icons/feature-ownership.svg',
      },
      {
        title: 'Autonomous build loops',
        blurb:
          'The agent team handles implementation details while keeping pull requests and build status ready for review.',
        icon: '/assets/icons/feature-build.svg',
      },
      {
        title: 'Deploy and operate',
        blurb:
          'Build, deploy, and operate work is planned together so software can keep moving after the first release.',
        icon: '/assets/icons/feature-operate.svg',
      },
      {
        title: 'Founder-speed collaboration',
        blurb:
          'You keep talking in plain language while myClawTeam translates decisions into concrete engineering work.',
        icon: '/assets/icons/feature-collaboration.svg',
      },
    ],
  },
  community: {
    eyebrow: 'Community',
    heading: 'Follow the founder-build conversation',
    subtext:
      'Join the places where myClawTeam shares product updates, founder workflows, and notes from autonomous software delivery.',
    cards: [
      {
        title: 'Discord',
        blurb:
          'Join the placeholder Discord community for build discussions, launch notes, and founder operating patterns.',
        ctaLabel: 'Join Discord',
        social: 'discord',
      },
      {
        title: 'X / Twitter',
        blurb:
          'Follow the placeholder X/Twitter channel for concise updates on myClawTeam releases, examples, and product notes.',
        ctaLabel: 'Follow on X',
        social: 'x',
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
