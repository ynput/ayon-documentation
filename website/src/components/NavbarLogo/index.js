import clsx from "clsx";
import React from "react";
import styles from "./styles.module.scss";

const NavbarLogo = ({ to, logo, title, logoInverted, logoStyle }) => {
    return (
        <div className={clsx("custom-logo", styles.navbarLogo)}>
            <a className="navbar__brand" href={to}>
                <div className={styles.logo} style={logoStyle}>
                    <img src={logo} alt={title} />
                    {logoInverted && <img src={logoInverted} alt={title} />}
                </div>
                {title && (
                    <b className="navbar__title text--truncate">{title}</b>
                )}
            </a>
        </div>
    );
};

export default NavbarLogo;
