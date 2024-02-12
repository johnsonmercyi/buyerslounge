import React from "react";
import styles from './styles.module.css';
import UISearchField from "../../search-field/search-field";
import UILogo from "../../logo/logo";
import UICart from "../../cart/cart";
import UIAccountAvatar from "../../account-avarta/account-avarta";

const Header1 = ({ props }) => {
  const searchOptions = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'articles', text: 'Articles', value: 'articles' },
    { key: 'products', text: 'Products', value: 'products' },
  ];
  return (
    <div className={styles.header1}>
      <UILogo />
      <div className={styles.right}>
        <UISearchField
          options={searchOptions} />
        <UICart />
        <UIAccountAvatar
          showAvatar={true}
          content={"Login"}
          spaced={"right"} />
      </div>
    </div>
  );
}

export default Header1;