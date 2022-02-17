import React from "react";
export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

export type NavData = {
  navItems: NavItem[];
};
export type UINav = React.FunctionComponent<{ navItems: NavItem[] }>;
const Nav: UINav;
export default Nav;