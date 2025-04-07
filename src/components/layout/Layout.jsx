const Layout = ({ children }) => {
	return (
		<div>
			<header>Header</header>
			{children && <div>{children}</div>}
		</div>
	)
}
export default Layout
