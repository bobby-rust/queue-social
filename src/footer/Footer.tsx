import "./Footer.css";

export default function Footer() {
    return (
        <footer>
            <div className="footer-upper">
                <div className="footer-logo">
                    <h2>queue social</h2>
                </div>
                <div className="footer-content">
                    <div>
                        <h2>Product</h2>
                        <ul>
                            <li>Overview</li>
                            <li>Features</li>
                            <li>Solutions</li>
                            <li>Tutorials</li>
                            <li>Pricing</li>
                            <li>Releases</li>
                        </ul>
                    </div>
                    <div>
                        <h2>Company</h2>
                        <ul>
                            <li>About us</li>
                            <li>Careers</li>
                            <li>Press</li>
                            <li>News</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div>
                        <h2>Resources</h2>
                        <ul>
                            <li>Blog</li>
                            <li>Newsletter</li>
                            <li>Events</li>
                            <li>Support</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-divider-container">
                <div className="footer-divider"></div>
            </div>
            <div className="footer-lower">
                <div className="footer-lower-tagline">
                    <h2>10x your workflow with queue social</h2>
                    <p>Save countless hours crafting the perfect posts</p>
                </div>
                <div className="footer-lower-copyright">
                    <p>©2025 QueueSocial. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
