import type { ComponentPropsWithRef, FC } from 'react';

import styles from './site-footer.module.css';

export type SiteFooterProps = ComponentPropsWithRef<'footer'>;

export const SiteFooter: FC<SiteFooterProps> = (props) => (
  <footer {...props} className={styles.root} data-scope>
    <span>Copyright © 2026 Sample</span>
    <span>運営会社</span>
  </footer>
);
