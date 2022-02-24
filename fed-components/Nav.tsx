import React from "react";
const Nav = (await import('ui/Nav')).default

export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

export type NavData = {
  navItems: NavItem[];
};

const FedNav = ({ navItems }: { navItems: NavItem[] | undefined }) => (
  <Nav navItems={navItems} />
)

export default FedNav;