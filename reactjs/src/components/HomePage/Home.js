import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue with react-leaflet and Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Home = () => {
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

    return (
        <div>
            <h1>IP Geolocation</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ip}
                    onChange={handleInputChange}
                    placeholder="Enter IP address"
                />
                <button type="submit">Get Geolocation</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {geoInfo && (
                <div>
                    <h2>Geolocation Information</h2>
                    <p>IP: {geoInfo.ip}</p>
                    <p>City: {geoInfo.city}</p>
                    <p>Region: {geoInfo.region}</p>
                    <p>Country: {geoInfo.country}</p>
                    <p>Location: {geoInfo.loc}</p>
                    {renderMap()}
                </div>
            )}
            <h2>Search History</h2>
            <button onClick={handleDeleteSelected} disabled={selectedHistory.size === 0}>
                Delete Selected
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
};

export default Home;
