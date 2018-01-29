import React from 'react';
import { Icon,  Button, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';


const Navigation = ({
    navigationItems,
    openMenu,
    changeActiveNavigationItem,
    closeMenu,
    smoothRise,
    getActiveClasses,
    navStyles,
    ...rest
}) => (
   <nav className={`navigation`}>
    <Container>
      <Button id='openMenuButton'
        className='navigation__openMenuButton'
        size='big'
        icon='bars'
        onClick={openMenu} />
      <ul className='navList'
          id='navList'
          style={navStyles}>
          <Icon id='closeMenuButton'
            className='navigation__closeMenuButton'
            name='close'
            size='big'
            onClick={closeMenu} />
          { navigationItems.map((item, index) => (
              <li className={getActiveClasses(item.active)} 
                key={index}
                onClick={changeActiveNavigationItem(item.index)} 
              >  
                <NavItem
                  block='navItem'
                  href={item.pathTo}
                  name={item.name}
                  isActive={item.active}
                  {...rest}
                />
              </li>
            ))}
            <li className='navItem'>  
                <a href='http://beautystore.oriflame.ru/105263' 
                  className='not-follow navItem__refer'>
                  Интернет магазин
                </a>
            </li>
        </ul>
      </Container>
    </nav>
  );
  

export default Navigation;
