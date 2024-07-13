import Link from "next/link";
import { BLOG_TITLE } from '@/constants';

import styles from './not-found.module.css';

export const metadata = {
  title: `404 Not found • ${BLOG_TITLE}`,
};

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>404 Not Found</h1>
      <p>This page does not exist. Please check the URL and check again</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
