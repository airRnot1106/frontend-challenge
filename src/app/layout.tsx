import type { Metadata } from 'next';

import styles from './layout.module.css';

import './globals.css';

export const metadata: Metadata = {
  description: 'Service Description',
  title: 'ServiceName',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ja">
      <body className={styles.body}>
        <div className={styles.root}>{children}</div>
      </body>
    </html>
  );
}
