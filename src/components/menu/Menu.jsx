
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function Menu(props) {
  var [currentMenu, setCurrentMenu] = useState('main_menu');
  const menu = {title: 'Menu', id: 'main_menu', sub_menus: props.menu};
  
  console.log(props.menu.length);
  // const [menu, setMenu] = React.useState({title:'Menu',sub_menus: []});
  // React.useEffect(() => {
  //   getMenu(null).then((response) => {
  //       if (response.status === 200) {
  //         setMenu({title:'Menu',sub_menus: response.data});
  //       }
  //   });
  // },[]);

  const menuClick = (reference, event) => {
    const curMenu = getTheMenu(reference, menu);

    if (curMenu.sub_menus && curMenu.sub_menus.length > 0) {
      var [ul] = document.getElementsByClassName('ul-menu');
      ul.classList.add('fadein');

      setTimeout((ref) => {
        setCurrentMenu(ref);
        ul.classList.remove('fadein');
      }, 300, reference);
    } else {
      if (curMenu.target?.url) {
        // var [html] = document.getElementsByTagName('html');

        // if (html.classList.contains('burger-menu-opened')) {
        //   html.classList.remove('burger-menu-opened');
        // } else {
        //   html.classList.add('burger-menu-opened');
        // }
      } else {
        alert('Page << ' + curMenu.title + ' >> en préparation !!');
      }
    }
  }

  let reference = 0;

  const tree = (previous, menu) => {
    if (previous) {
      menu['previous'] = previous;
    }
    menu.sub_menus?.map((m) => tree(menu, m));
  };

  tree(null, menu);

  const getTheMenu = (current, menu) => {
    if (menu.id == current) {
      return menu;
    }

    if (!menu.sub_menus || menu.sub_menus.length === 0) {
      return null;
    }

    return menu.sub_menus.reduce((selected, e) => {
      return selected || getTheMenu(current, e);
    }, null);
  };

  const goTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    // document.getElementsByTagName('html')[0].scrollTop = 0;
  };

  return (
    <>
      <div className="burger-menu-container noselect">
        <ul className="ul-menu" style={{ maxWidth: '600px', margin: 'auto' }}>
          {
            (() => {
              const curMenu = getTheMenu(currentMenu, menu);
              return (
                <>
                  <li onClick={(e) => curMenu.previous ? menuClick(curMenu.previous.id, e) : {}} data-reference={curMenu.previous?.id}
                    style={{ visibility: curMenu.previous ? 'visible' : 'hidden', height: '38px' }}>
                    <div className="menu-separator" style={{ padding: '0px 3px', flexGrow: 0, float: 'left' }}>
                      <FontAwesomeIcon icon={faChevronLeft} className="burger" style={{
                        fontSize: "12px",
                        marginTop: "1px"
                      }} />
                    </div>
                  </li>
                  <li style={{ textAlign: 'center' }}>
                    {curMenu.title}
                  </li>
                </>
              )
            })()
          }
          {
            (() => {
              const curMenu = getTheMenu(currentMenu, menu);
              const template = (menu, index) => {
                return (
                  <li key={index} className="is-menu" onClick={(e) => menuClick(menu.id, e)} data-reference={menu.id}>
                    {menu.title}
                    {menu.sub_menus?.length > 0 ?
                      (
                        <div className="menu-separator" style={{ padding: '0px 3px', flexGrow: 0, float: 'right' }}>
                          <FontAwesomeIcon icon={faChevronRight} className="burger" style={{
                            fontSize: "12px",
                            marginTop: "1px"
                          }} />
                        </div>
                      ) : (<></>)
                    }
                  </li>)
              };

              return curMenu.sub_menus.map(function (menu, index) {
                return menu.target?.url ? (<a href={menu.target.url} className="" onClick={goTop} key={index}>{template(menu)}</a>) : template(menu, index);
              });
            })()
          }
        </ul>
      </div>
    </>
  )
}