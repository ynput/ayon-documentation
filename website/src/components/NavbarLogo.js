import React from "react";

const NavbarLogo = ({ to, logo, title, logoInverted }) => {
    return (
        <div className="custom-logo">
            <a className="navbar__brand" href={to}>
                <div className="navbar__logo">
                    <img
                        src={logo}
                        alt={title}
                        className="themedImage_node_modules-@docusaurus-theme-classic-lib-theme-ThemedImage-styles-module themedImage--light_node_modules-@docusaurus-theme-classic-lib-theme-ThemedImage-styles-module"
                    />
                    {logoInverted && (
                        <img
                            src={logoInverted}
                            alt={title}
                            className="dark themedImage_node_modules-@docusaurus-theme-classic-lib-theme-ThemedImage-styles-module themedImage--light_node_modules-@docusaurus-theme-classic-lib-theme-ThemedImage-styles-module"
                        />
                    )}
                </div>

                <b className="navbar__title text--truncate">{title}</b>
            </a>
        </div>
    );
};

export default NavbarLogo;
