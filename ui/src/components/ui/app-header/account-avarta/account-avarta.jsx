import React from "react";
import styles from './styles.module.css';
import { Label } from "semantic-ui-react";
// import { avatar } from "../../../../util/images/avatar.svg";

const UIAccountAvatar = ({
  showAvatar = false,
  spaced,
  imageSrc,
  content,
  ...props }) => {

  const imageProps = {
    avatar: showAvatar,
    spaced: spaced,
    src: imageSrc || ``,
  }

  return (<Label
    className={styles.label}
    as='a'
    icon={!imageSrc ? "user" : ""}
    content={content || ''}
    image={imageProps}
    {...props} />);
}

export default UIAccountAvatar;