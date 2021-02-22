import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavItem({
  type,
  name,
  onClick,
  label,
  styling,
  state,
  iconOn,
  iconOff,
  labelOn,
  labelOff,
}) {
  var navItem;

  if (type === "checkbox") {
    if (!styling || styling === "checkbox") {
      navItem = (
        <div className={name + "-container nav-item"}>
          <div className="checkbox-container">
            <input
              className={name}
              id={name}
              name={name}
              type={type}
              onClick={onClick}
            />
            <div className="checkmark">✔</div>
          </div>
          <label className={name + "-label"} htmlFor={name}>
            {label}
          </label>
        </div>
      );
    } else if (styling === "icon") {
      navItem = (
        <FontAwesomeIcon
          className="icon-checkbox nav-item fa-icon fa-fw"
          icon={state ? iconOn : iconOff}
          onClick={onClick}
          title={state ? labelOn : labelOff}
        />
      );
    }
  } else if (type === "button") {
    navItem = (
      <button className={name + " nav-item"} onClick={onClick}>
        {label}
      </button>
    );
  } else {
    navItem = null;
  }

  return navItem;
}

export default NavItem;
