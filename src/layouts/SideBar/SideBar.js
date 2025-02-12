import React, { Fragment, useState, useEffect } from "react";
import {
  MENUITEMS,
  HODMENUITEMS,
  ADMINMENUITEMS,
  FACULTYMENUITEMS,
  SIMPLEMENUITEMS
} from "./SideMenu";
import { Link, NavLink } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
const Sidebar = () => {
  const MENU = ["3"].includes(sessionStorage.getItem("role"))
    ? FACULTYMENUITEMS
    : ["2"].includes(sessionStorage.getItem("role"))
    ? HODMENUITEMS
    : ["1"].includes(sessionStorage.getItem("role"))
    ? ADMINMENUITEMS
    : ["0"].includes(sessionStorage.getItem("role"))
    ? MENUITEMS
    : SIMPLEMENUITEMS;
  const [mainmenu, setMainMenu] = useState(MENU);
  useEffect(() => {
    const currentUrl = window.location.pathname.slice(0, -1);
    MENU.map((items) => {
      items.Items.filter((Items) => {
        if (Items.path === currentUrl) setNavActive(Items);
        if (!Items.children) return false;
        Items.children.filter((subItems) => {
          if (subItems.path === currentUrl) setNavActive(subItems);
          if (!subItems.children) return false;
          subItems.children.filter((subSubItems) => {
            if (subSubItems.path === currentUrl) {
              setNavActive(subSubItems);
              return true;
            } else {
              return false;
            }
          });
          return subItems;
        });
        return Items;
      });
      return items;
    });
    // PROPERTYMANAGERMENU.map((items) => {
    //   items.Items.filter((Items) => {
    //     if (Items.path === currentUrl) setNavActive(Items);
    //     if (!Items.children) return false;
    //     Items.children.filter((subItems) => {
    //       if (subItems.path === currentUrl) setNavActive(subItems);
    //       if (!subItems.children) return false;
    //       subItems.children.filter((subSubItems) => {
    //         if (subSubItems.path === currentUrl) {
    //           setNavActive(subSubItems);
    //           return true;
    //         } else {
    //           return false;
    //         }
    //       });
    //       return subItems;
    //     });
    //     return Items;
    //   });
    //   return items;
    // });
  }, []);

  const setNavActive = (item) => {
    MENU.map((menuItems) => {
      menuItems.Items.filter((Items) => {
        if (Items !== item) {
          Items.active = false;
        }
        if (Items.children && Items.children.includes(item)) {
          Items.active = true;
        }
        if (Items.children) {
          Items.children.filter((submenuItems) => {
            if (submenuItems.children && submenuItems.children.includes(item)) {
              Items.active = true;
              submenuItems.active = true;
              return true;
            } else {
              return false;
            }
          });
        }
        return Items;
      });
      return menuItems;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENU });
  };

  const toggletNavActive = (item) => {
    if (window.innerWidth <= 991) {
      if (item.type === "sub") {
      }
    }
    if (!item.active) {
      MENU.map((a) => {
        a.Items.filter((Items) => {
          if (a.Items.includes(item)) Items.active = false;
          if (!Items.children) return false;
          Items.children.forEach((b) => {
            if (Items.children.includes(item)) {
              b.active = false;
            }
            if (!b.children) return false;
            b.children.forEach((c) => {
              if (b.children.includes(item)) {
                c.active = false;
              }
            });
          });
          return Items;
        });
        return a;
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENU });
  };

  //Hover effect
  function Onhover() {
    if (document.querySelector(".app").classList.contains("sidenav-toggled"))
      document.querySelector(".app").classList.add("sidenav-toggled-open");
  }
  function Outhover() {
    document.querySelector(".app").classList.remove("sidenav-toggled-open");
  }

  return (
    <div className="sticky">
      <div className="app-sidebar__overlay"></div>
      <aside
        className="app-sidebar"
        onMouseOver={() => Onhover()}
        onMouseOut={() => Outhover()}
      >
        <Scrollbars style={{ width: 270, height: 670 }}>
          <div className="header side-header">
            <Link
              to={`${process.env.PUBLIC_URL}/dashboard/`}
              className="header-brand1"
            >
              <img
                src={require("../../assets/images/brand/logo.png")}
                className="header-brand-img desktop-logo"
                alt={"logo"}
              />
              <img
                src={require("../../assets/images/fav.png")}
                className="header-brand-img toggle-logo"
                alt={"logo-1"}
              />
              <img
                src={require("../../assets/images/fav.png")}
                className="header-brand-img light-logo"
                alt={"logo-2"}
              />
              <img
                src={require("../../assets/images/mainlogo.png")}
                className="header-brand-img light-logo1"
                alt={"logo-3"}
              />
            </Link>
          </div>
          <div className="main-sidemenu">
            <ul className="side-menu" id="sidebar-main">
              {MENU.map((Item, i) => (
                <Fragment key={i}>
                  <li className="sub-category">
                    <h3>{Item.menutitle}</h3>
                  </li>
                  {Item.Items.map((menuItem, i) => (
                    <li
                      className={`slide ${
                        menuItem.active ? "is-expanded" : ""
                      }`}
                      key={i}
                    >
                      {menuItem.type === "link" ? (
                        <NavLink
                          to={menuItem.path + "/"}
                          className={`side-menu__item ${
                            menuItem.active ? "active" : ""
                          }`}
                          onClick={() => {
                            setNavActive(menuItem);
                            toggletNavActive(menuItem);
                          }}
                        >
                          <i
                            className={`side-menu__icon fe fe-${menuItem.icon}`}
                          ></i>
                          <span className="side-menu__label">
                            {menuItem.title}
                          </span>
                          {menuItem.badge ? (
                            <label className={`${menuItem.badge} side-badge`}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ""
                          )}
                        </NavLink>
                      ) : (
                        ""
                      )}

                      {menuItem.type === "sub" ? (
                        <NavLink
                          to={menuItem.path + "/"}
                          className={`side-menu__item ${
                            menuItem.active ? "active" : ""
                          }`}
                          onClick={(event) => {
                            event.preventDefault();
                            setNavActive(menuItem);
                          }}
                        >
                          <i
                            className={`side-menu__icon fe fe-${menuItem.icon}`}
                          ></i>
                          <span className="side-menu__label">
                            {menuItem.title}
                          </span>
                          {menuItem.badge ? (
                            <label className={`${menuItem.badge} side-badge`}>
                              {menuItem.badgetxt}
                            </label>
                          ) : (
                            ""
                          )}
                          <i
                            className={`${menuItem.background} fa angle fa-angle-right `}
                          ></i>
                        </NavLink>
                      ) : (
                        ""
                      )}
                      {menuItem.children ? (
                        <ul
                          className="slide-menu"
                          style={
                            menuItem.active
                              ? {
                                  opacity: 1,
                                  transition: "opacity 500ms ease-in",
                                  display: "block",
                                }
                              : { display: "none" }
                          }
                        >
                          {menuItem.children.map((childrenItem, index) => {
                            return (
                              <li key={index}>
                                {childrenItem.type === "sub" ? (
                                  <a
                                    href="javascript"
                                    className="sub-side-menu__item"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      toggletNavActive(childrenItem);
                                    }}
                                  >
                                    <span className="sub-side-menu__label">
                                      {childrenItem.title}
                                    </span>
                                    {childrenItem.active ? (
                                      <i className="sub-angle  fa fa-angle-down"></i>
                                    ) : (
                                      <i className="sub-angle fa fa-angle-right"></i>
                                    )}
                                  </a>
                                ) : (
                                  ""
                                )}
                                {childrenItem.type === "link" ? (
                                  <NavLink
                                    to={childrenItem.path + "/"}
                                    className="slide-item"
                                    onClick={() =>
                                      toggletNavActive(childrenItem)
                                    }
                                  >
                                    {childrenItem.title}
                                  </NavLink>
                                ) : (
                                  ""
                                )}
                                {childrenItem.children ? (
                                  <ul
                                    className="sub-slide-menu"
                                    style={
                                      childrenItem.active
                                        ? { display: "block" }
                                        : { display: "none" }
                                    }
                                  >
                                    {childrenItem.children.map(
                                      (childrenSubItem, key) => (
                                        <li key={key}>
                                          {childrenSubItem.type === "link" ? (
                                            <NavLink
                                              to={childrenSubItem.path + "/"}
                                              className={`${"sub-slide-item"}`}
                                              onClick={() =>
                                                toggletNavActive(
                                                  childrenSubItem
                                                )
                                              }
                                            >
                                              {childrenSubItem.title}
                                            </NavLink>
                                          ) : (
                                            ""
                                          )}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  ""
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
          </div>
        </Scrollbars>
      </aside>
    </div>
  );
};

export default Sidebar;
