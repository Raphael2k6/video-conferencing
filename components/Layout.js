import React from 'react'
import Header from './Header'
import styles from '../styles/Layout.module.scss';
import Nav from './Nav';

const Layout = ({children}) => {
  return (
    <>
      <Header />
      <Nav />
      <div className={styles.container}>
        {children}
      </div>
        <footer className={styles.footer}>
            <p>Copyright &copy; Raphael Donanu. All Rights Reserved.</p>
        </footer>
    </> 
  )
}

export default Layout;