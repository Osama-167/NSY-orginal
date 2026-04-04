import React, { useMemo, useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { TfiAlignJustify, TfiClose } from "react-icons/tfi";

const sanitizeId = (v) =>
  String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-_]/g, "");

const Navbar = ({ content }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeClass, setActiveClass] = useState("home");
  const location = useLocation();

  const isHome = location.pathname === "/";

  const onClickHandler = (name) => {
    setActiveClass(name);
    setShowMenu(false);
  };

  const navItems = useMemo(() => {
    const items = [];

    if (content?.about) items.push({ id: "about", label: "About Us" });
    if (content?.services) items.push({ id: "services", label: "Services" });
    if (content?.team) items.push({ id: "team", label: "Team" });

    const dynRaw = Array.isArray(content?.dynamicSections)
      ? content.dynamicSections
      : [];

    dynRaw.forEach((sec, idx) => {
      const rawId = sec?.id ?? sec?.slug ?? sec?.targetId ?? sec?.sectionId ?? "";
      const rawTitle = sec?.title ?? sec?.name ?? sec?.label ?? "";

      const baseId = sanitizeId(rawId);
      const label = String(rawTitle || "").trim();

      if (!baseId || !label) return;

      let finalId = baseId;
      if (items.some((x) => x.id === finalId)) {
        finalId = `dyn-${finalId}-${idx + 1}`;
      }

      items.push({ id: finalId, label });
    });

    if (content?.contact) items.push({ id: "contact", label: "Contact" });

    // eslint-disable-next-line no-console
    console.log("NAV_ITEMS =>", items, "DYNAMIC_RAW =>", dynRaw);

    return items;
  }, [content]);

  if (!isHome) {
    return (
      <div className="navbar-container">
        <div>
          <nav className="navbar">
            <RouterLink to="/" style={{ display: "flex", alignItems: "center" }}>
              <img src={logo} alt="logo" className="logo" />
            </RouterLink>

            <div className="desktopMenu">
              <RouterLink
                to="/"
                className="desktopMenuListItem"
                style={{ textDecoration: "none" }}
              >
                Home
              </RouterLink>

              <RouterLink
                to="/registration"
                className="desktopMenuListItem active"
                style={{ textDecoration: "none" }}
              >
                Registration
              </RouterLink>
            </div>
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar-container">
      <div>
        <nav className="navbar">
          <img src={logo} alt="logo" className="logo" />

          <div className="desktopMenu">
            {/* Home */}
            <ScrollLink
              to="hero"
              smooth={true}
              duration={500}
              onClick={() => onClickHandler("home")}
              className={
                activeClass === "home"
                  ? "desktopMenuListItem active"
                  : "desktopMenuListItem"
              }
            >
              Home
            </ScrollLink>

            {/* All sections */}
            {navItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                smooth={true}
                duration={500}
                offset={item.id === "about" ? -120 : -100}
                onClick={() => onClickHandler(item.id)}
                className={
                  activeClass === item.id
                    ? "desktopMenuListItem active"
                    : "desktopMenuListItem"
                }
              >
                {item.label}
              </ScrollLink>
            ))}

            {/* Registration */}
            <RouterLink
              to="/registration"
              className="desktopMenuListItem"
              style={{ textDecoration: "none" }}
              onClick={() => setShowMenu(false)}
            >
              Registration
            </RouterLink>
          </div>

          <div className="mobMenu" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <TfiClose /> : <TfiAlignJustify />}
          </div>

          <div
            className="navMenu"
            style={{ display: showMenu ? "flex" : "none" }}
          >
            <ScrollLink
              to="hero"
              smooth={true}
              duration={500}
              onClick={() => onClickHandler("home")}
              className={activeClass === "home" ? "listItem active" : "listItem"}
            >
              Home
            </ScrollLink>

            {navItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                smooth={true}
                duration={500}
                offset={item.id === "about" ? -120 : -100}
                onClick={() => onClickHandler(item.id)}
                className={
                  activeClass === item.id ? "listItem active" : "listItem"
                }
              >
                {item.label}
              </ScrollLink>
            ))}

            <RouterLink
              to="/registration"
              className="listItem"
              style={{ textDecoration: "none" }}
              onClick={() => setShowMenu(false)}
            >
              Registration
            </RouterLink>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
