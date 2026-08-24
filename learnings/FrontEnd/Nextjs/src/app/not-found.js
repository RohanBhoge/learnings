// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>The page or resource you are looking for does not exist.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}