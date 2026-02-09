import React from "react";
import clsx from "clsx";
import styles from "../styles.module.css";

const CardBody = ({
  className,
  style,
  children,
  textAlign,
  truncate = false,
}) => {
  const text = textAlign ? `text--${textAlign}` : "";
  const textTruncate = truncate ? styles.truncate : "";
  
  return (
    <div
      className={clsx("card__body", className, text, textTruncate)}
      style={style}
    >
      {children}
    </div>
  );
};

export default CardBody;
