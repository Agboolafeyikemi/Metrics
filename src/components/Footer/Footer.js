import React, { useMemo } from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        🚀Built with{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://facebook.github.io/react/"
        >
          React
        </a>{" "}
        and{" "}
        <a target="_blank" href="https://react-google-charts.com/">
          Google Charts
        </a>
        &nbsp;🚀
      </p>
      <p>
        See source code on{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/VikasDayananda/tune-app"
        >
          GitHub
        </a>
      </p>
      <p className="footerCopyRight">© 2022 Agboola Feyikemi</p>
    </div>
  );
};

export default Footer;
