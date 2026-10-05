import { SiteFooter } from '../../features/site/components/site-footer/site-footer';
import { SiteSidebarContainer } from '../../features/site/components/site-sidebar/site-sidebar.container';
import styles from './layout.module.css';

export default function PagesLayout({ children }: LayoutProps<'/pages'>) {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>
        <SiteSidebarContainer />
      </div>
      <main className={styles.main}>{children}</main>
      <div className={styles.footer}>
        <SiteFooter />
      </div>
    </div>
  );
}
