import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faPaw, 
    faPrescriptionBottle, 
    faCapsules,
    faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
                <Container>
                    <Navbar.Brand as={Link} to="/">Veteriner Reçete Sistemi</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link 
                                as={Link} 
                                to="/" 
                                active={location.pathname === '/'}
                            >
                                <FontAwesomeIcon icon={faHome} className="me-2" />
                                Ana Sayfa
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/patients" 
                                active={location.pathname === '/patients'}
                            >
                                <FontAwesomeIcon icon={faPaw} className="me-2" />
                                Hastalar
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/prescriptions" 
                                active={location.pathname === '/prescriptions'}
                            >
                                <FontAwesomeIcon icon={faPrescriptionBottle} className="me-2" />
                                Reçeteler
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to="/medicines" 
                                active={location.pathname === '/medicines'}
                            >
                                <FontAwesomeIcon icon={faCapsules} className="me-2" />
                                İlaçlar
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={handleLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                Çıkış
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="flex-grow-1 mb-4">
                <Outlet />
            </Container>

            <footer className="bg-light py-3 mt-auto">
                <Container className="text-center">
                    <p className="mb-0">&copy; 2024 Veteriner Reçete Sistemi. Tüm hakları saklıdır.</p>
                </Container>
            </footer>
        </div>
    );
};

export default Layout; 