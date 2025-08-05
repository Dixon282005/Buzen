function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-quote">"I create technology, but it's technology that makes me want to create."</p>
        <div className="stackscon">
        <p className="footer-stack">Made with 💜 React and pure CSS</p>
        <p className="footer-location">📍 Venezuela | GMT-4</p>

</div>
 {/*icons here */}
  
        <p className="footer-copy">© {new Date().getFullYear()} Dixon Ramos. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
