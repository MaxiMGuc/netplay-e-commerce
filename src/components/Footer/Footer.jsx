import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} PiksуriShop. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
