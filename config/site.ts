export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Vivatech",
  description: "Vivatech Tecnología para el campo.",
  navItems: [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    // { label: "Kit solar", href: "/kit-solar" },
    { label: "Clientes", href: "/clients" },
    { label: "FAQs", href: "/faqs" },
    { label: "Blog", href: "/blog" },
    { label: "Contáctanos", href: "/contact" },
  ],
  navMenuItems: [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    // { label: "Kit solar", href: "/kit-solar" },
    { label: "Clientes", href: "/clients" },
    { label: "FAQs", href: "/faqs" },
    { label: "Blog", href: "/blog" },
    { label: "Contáctanos", href: "/contact" },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
