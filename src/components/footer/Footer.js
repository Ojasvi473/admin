import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  console.log(
    Object.entries(
      JSON.parse(localStorage.getItem("dashboardPage")).performance
    ).map((d) => {
      return { y: d[0], x: d[1], fillColor: d[0], strokeColor: d[0] };
    })
  );

  return (
    <footer className={styles.footer}>
      <p>
        Copyright &copy; <b>2018</b> All rights reserved. Design: Template Mo
      </p>
      <div></div>
    </footer>
  );
};

export default Footer;
