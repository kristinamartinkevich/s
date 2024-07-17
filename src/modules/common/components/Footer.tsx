
const Footer = () => {
  return (
    <footer>
      <div className="row footer align-items-center justify-content-between p-4">
        <span className="main-text col-2">S © {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

export default Footer;
