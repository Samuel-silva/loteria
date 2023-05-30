import './Footer.css';

function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="footer">
			<div className="wrapper">
				<p className="footer__text">
					© { currentYear } - Todos direitos reservados
				</p>
			</div>
		</footer>
	)
}

export default Footer;
