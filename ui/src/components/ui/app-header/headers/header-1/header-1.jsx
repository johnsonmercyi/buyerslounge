import React, { useEffect } from "react";
import UIAccountAvatar from "../../account-avarta/account-avarta";
import UICart from "../../cart/cart";
import UILogo from "../../logo/logo";
import UISearchField from "../../search-field/search-field";
import styles from './styles.module.css';

const searchOptions = [
  { key: 'all', text: 'All', value: 'all' },
  { key: 'articles', text: 'Articles', value: 'articles' },
  { key: 'products', text: 'Products', value: 'products' },
];

const Header1 = ({ props }) => {

  useEffect(() => {
  }, []);

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