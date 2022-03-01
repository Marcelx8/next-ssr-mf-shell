export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

export type NavData = {
  navItems: NavItem[];
};

const loadNavData = async (): Promise<NavItem[]> => {
  const nav: NavItem[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "UI",
      href: "/ui",
    },
    {
      label: "FAQ",
      href: "/faq",
    },
    {
      label: "Foo",
      href: "/foo",
    },
  ];

  return nav;
}

export default loadNavData