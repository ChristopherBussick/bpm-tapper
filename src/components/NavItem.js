import React from "react";

function NavItem( { type, name, onClick, label }) {

  var navItem;

  if (type === "checkbox") {
    navItem = 
      <div className={name + "-container nav-item"}>
        <div className="checkbox-container">
          <input className={name} id={name} name={name} type={type} onClick={onClick} />
          <div className="checkmark">✔</div>
        </div>
        <label className={name + "-label"} htmlFor={name}>{label}</label>
      </div>;
  } else if (type === "button") {
    navItem = <button className={name + " nav-item"} onClick={onClick}>{label}</button>;
  } else {
    navItem = null;
  }

  return navItem;
}

export default NavItem;