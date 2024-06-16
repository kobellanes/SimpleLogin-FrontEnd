import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import http from '../../http';
import { Link, useNavigate, useParams } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Home = () => {

    const entry = localStorage.getItem("qygzfhIgkyd");
    const [accountDetails, setAccountDetails] = useState({});

    const [finalLoader, setFinalLoader] = useState(true);

    const navigate = useNavigate();

    const [authorized, setAuthorized] = useState();

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const result = await http.post('/login', { accessToken: entry });
                const filter = result.data.filter((account) => account.accessToken === entry);

                if (filter.length === 0 || filter[0].status !== "wbpaztjspekazgkaznnwltpanw") {
                    setAuthorized("false");
                    localStorage.clear();
                } else {
                    setAccountDetails(filter[0]);
                    setAuthorized("true");
                }
            } catch (error) {
                console.error('Error fetching account:', error);
                setAuthorized("false");
            } finally {
                setTimeout(() => {
                    setFinalLoader(false);
                }, 1000);
            }
        };

        fetchAccount();
    }, [entry]);

    const [ip, setIp] = useState('');
    const [geoInfo, setGeoInfo] = useState(null);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);
    const [selectedHistory, setSelectedHistory] = useState(new Set());

    useEffect(() => {
        fetchUserIp();
    }, []);

    const fetchUserIp = async () => {
        try {
            const response = await axios.get('https://ipinfo.io/json');
            setIp(response.data.ip);
            fetchGeoInfo(response.data.ip);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchGeoInfo = async (ipAddress) => {
        try {
            const response = await axios.get(`https://ipinfo.io/${ipAddress}/geo`);
            setGeoInfo(response.data);
            setIp(ipAddress);
            setError('');
            if (!history.includes(ipAddress)) {
                setHistory([...history, ipAddress]);
            }
        } catch (err) {
            setError('Failed to fetch geolocation information');
            setGeoInfo(null);
        }
    };

    const handleInputChange = (e) => {
        setIp(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateIp(ip)) {
            fetchGeoInfo(ip);
        } else {
            setError('Invalid IP address');
            setGeoInfo(null);
        }
    };

    const validateIp = (ipAddress) => {
        const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipPattern.test(ipAddress);
    };

    const handleCheckboxChange = (ipAddress) => {
        const newSelectedHistory = new Set(selectedHistory);
        if (newSelectedHistory.has(ipAddress)) {
            newSelectedHistory.delete(ipAddress);
        } else {
            newSelectedHistory.add(ipAddress);
        }
        setSelectedHistory(newSelectedHistory);
    };

    const handleDeleteSelected = () => {
        setHistory(history.filter((item) => !selectedHistory.has(item)));
        setSelectedHistory(new Set());
    };

    const logout = async () => {

        http.post('/logout', { accessToken: entry }).then(result => {

            localStorage.clear();
            navigate("/");

        });
    }


    const renderMap = () => {
        if (!geoInfo || !geoInfo.loc) return null;

        const [lat, lon] = geoInfo.loc.split(',');

        return (
            <MapContainer center={[lat, lon]} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]}>
                    <Popup>
                        {geoInfo.city}, {geoInfo.region}, {geoInfo.country}
                    </Popup>
                </Marker>
            </MapContainer>
        );
    };

    if (finalLoader) {
        return (
            <>
                <div className="loading-container">
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>

            </>

        )
    } else if (authorized === "true") {
        return (
            <div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2>IP and Geolocation Information</h2>

                    <button
                        className="btn btn-danger border border-2 p-2 rounded-2 m-2 " onClick={logout}
                    >
                        Logout
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={ip}
                        onChange={handleInputChange}
                        placeholder="Enter IP address"
                    />
                    <button type="submit">Search Geolocation</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {geoInfo && (
                    <div>
                        <h2>Geolocation Information</h2>
                        <p className='fw-bold'>IP: {geoInfo.ip}</p>
                        <p className='fw-bold'>City: {geoInfo.city}</p>
                        <p className='fw-bold'>Region: {geoInfo.region}</p>
                        <p className='fw-bold'>Country: {geoInfo.country}</p>
                        <p className='fw-bold'>Location: {geoInfo.loc}</p>
                        {renderMap()}
                    </div>
                )}
                <h2>Search History</h2>
                <button onClick={handleDeleteSelected} disabled={selectedHistory.size === 0}>
                    Delete
                </button>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            <input
                                type="checkbox"
                                checked={selectedHistory.has(item)}
                                onChange={() => handleCheckboxChange(item)}
                            />
                            <span
                                onClick={() => fetchGeoInfo(item)}
                                style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}
                            >
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        return (
            <main className="patient-notfound-loader d-flex flex-column">

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
        )
    }


};

export default Home;
