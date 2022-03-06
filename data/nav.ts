export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

export type NavData = {
  navItems: NavItem[];
};

const navData: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Faq",
    href: "/faq",
  },
  {
    label: "Foo",
    href: "/foo",
  },
  {
    label: "UI",
    href: "/ui",
  },
]

export default navData