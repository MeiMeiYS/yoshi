
import './Footer.css';

const Footer = () => {

    const goToLinkedIn = e => {
        e.preventDefault();
        window.location.href = 'https://www.linkedin.com/in/meiyinshih/';

    }

    const goToGithub = e => {
        e.preventDefault();
        window.location.href = 'https://github.com/MeiMeiYS';
    }

    const goToMyWeb = e => {
        e.preventDefault();
        window.location.href = 'https://meiys.me/';
    }

    return (
        <footer>
            <div className='footer-explore'>
                <h4>Explore</h4>
                <div className='footer-links'>
                    <button
                        type='button'
                        onClick={goToLinkedIn}>
                        <i className="fab fa-linkedin-in"></i>
                    </button>
                    <button
                        type='button'
                        onClick={goToGithub}>
                        <i className="fab fa-github"></i>
                    </button>
                    <button
                        type='button'
                        onClick={goToMyWeb}>
                        <i className="fab fa-medium-m"></i>
                    </button>
                </div>
            </div>
            <p>© 2022 | Designed & coded by Mei Shih | React Express PostgreSQL</p>
        </footer>
    )
}


export default Footer;
