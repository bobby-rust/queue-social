import React from "react";

export default function Footer() {
	return (
		<footer
			style={{
				backgroundColor: "#f8f9fa",
				padding: "1rem",
				textAlign: "center",
			}}>
			<div>
				<p>&copy; {new Date().getFullYear()} PostFuze. All rights reserved.</p>
				<p>
					<a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
				</p>
				<p>
					<a href="https://twitter.com/postfuze" target="_blank" rel="noopener noreferrer">
						Twitter
					</a>{" "}
					|
					<a href="https://facebook.com/postfuze" target="_blank" rel="noopener noreferrer">
						Facebook
					</a>{" "}
					|
					<a href="https://instagram.com/postfuze" target="_blank" rel="noopener noreferrer">
						Instagram
					</a>
				</p>
			</div>
		</footer>
	);
}
