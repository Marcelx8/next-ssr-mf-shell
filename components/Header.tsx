import React from "react";
import dynamic from "next/dynamic";
import { useSSE } from "use-sse";
import loadNavData from "../data/nav";

// const Nav = dynamic(() => import('ui/OldNav'))
// const Nav = dynamic(() => import('ui/Nav'))
import Nav from 'ui/Nav'

const Header = () => {
  const [items, error] = useSSE(async() => {
    // return loadNavData().then(navItems => navItems)
  }, [])

  return (
    <Nav navItems={items} />
  )
}

export default Header