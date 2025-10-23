import Link from "next/link"

const Footer = ({ className = "" }) => {
  return (
    <footer className={`mt-8 ${className}`}>
      <hr />
      <div className="flex justify-between mt-4 text-sm font-light">
        <p className=" text-muted-foreground">
          &copy; 2023 Sosial Prettify. All rights reserved.
        </p>
        <nav className="flex gap-4">
          <Link href={'/privacy'} className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
          <Link href={'/faq'} className="text-muted-foreground hover:text-primary">FAQ</Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer