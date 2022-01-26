import { Box } from '@skynexui/components';
import React from 'react';
import appConfig from "../../config.json";
import styles from "../../styles/layout.module.css"

export default function Layout ({ children }) {
  return (
   <div className={styles.background}>
      <Box className={styles.box} styleSheet={{backgroundColor: appConfig.theme.colors.neutrals[700],}}>{children}</Box>
   </div>
  )
};