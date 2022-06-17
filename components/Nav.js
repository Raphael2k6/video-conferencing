import React from 'react';
import styles from '../styles/nav.module.scss';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className={styles.nav}>
    <Link href="/">
      <span>KConferencing</span>
    </Link>
        {/* <ul>
            <li>Home</li>
            <li>About</li>
            <li>Teams</li>
        </ul> */}
        <span>Log In</span>
    </nav>
  )
  }

  export default Nav;
