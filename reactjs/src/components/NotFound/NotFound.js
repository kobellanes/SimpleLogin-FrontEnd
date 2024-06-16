import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowLoader(false);
        }, 1500);

        return () => clearTimeout(timeoutId);

    }, []);

    return (
        <>
            {
                showLoader ?
                    <div className="loading-container">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                    :
                    <main className="patient-notfound-loader d-flex flex-column">
                        <nav className="navbar navbar-expand-lg" id="home-navbar">
                            <div className="container">
                                <Link className="navbar-brand fs-2" id="Navbar-logo">
                                    <i className="fas fa-briefcase-medical me-2" id="logo-home" />
                                    Vita
                                    <span style={{ color: "#0390d1" }}>Link</span>
                                </Link>

                            </div>
                        </nav>
                        <div className="row justify-content-center align-items-center mt-5 pt-3">
                            <div className="col-sm-10 text-center">
                                <section className="page_404">
                                    <div className="four_zero_four_bg">
                                        <h1 className="text-center">404</h1>
                                    </div>

                                    <div className="contant_box_404">
                                        <h3 className="h2">Looks like you're lost</h3>
                                        <p>The page you are looking for is not available!</p>
                                        <Link to="/" className="link_404">Go to Home</Link>
                                    </div>
                                </section>
                            </div>
                        </div>

                    </main>
            }

        </>
    );
}

export default NotFound;