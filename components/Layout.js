import React from 'react'
import Header from './Header'
import styles from '../styles/Layout.module.scss';

const Layout = ({children}) => {
  return (
    <>
    <Header />
        <nav className={styles.nav}>
            <span>KConferencing</span>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Teams</li>
            </ul>
            <span>Log In</span>
        </nav>
        {children}
        <footer className={styles.footer}>
            <p>Copyright &copy; Raphael Donanu. All Rights Reserved.</p>
        </footer>
    </> 
  )
}

export default Layout