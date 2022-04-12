import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GridCloseIcon } from '@material-ui/data-grid';
import { Schedule } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { useStyles } from './useStyles';
import { AiFillMedicineBox, GiHamburgerMenu } from 'react-icons/all';

const SidebarData: any[] = [
  {
    title: "Find medicine",
    path: "/",
    icon: <AiFillMedicineBox />,
  },
  {
    title: "Schedule",
    path: "/schedule",
    icon: <Schedule />,
  }
];
function SideBar() {
  const [sidebar, setSidebar] = useState(false);
  const classes = useStyles();
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
        <div className={classes.navbar}>
          <IconButton  onClick={showSidebar} >
            <GiHamburgerMenu/>
          </IconButton>
        </div>
        <nav className={sidebar ? classes.navMenuActive : classes.navMenu}>
          <ul className={classes.navMenuItems} onClick={showSidebar}>
            <li className={classes.navToggle}>
              <Link to="#" className={classes.menuBars}>
                <GridCloseIcon />
              </Link>
            </li>
            
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={classes.navText}>
                  <Link to={item.path} className={classes.navTextA}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
    </>
  );
}

export default SideBar;