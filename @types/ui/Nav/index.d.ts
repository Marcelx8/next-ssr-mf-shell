import React from "react";
export type NavItem = {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
}

export type NavData = {
  navItems: NavItem[] | undefined;
  count?: number
};
export type UINav = React.FunctionComponent<NavProps>;
const Nav: UINav;
export default Nav;