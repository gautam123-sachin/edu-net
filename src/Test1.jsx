import React, { useState, useEffect } from 'react';

const Test1 = () => {
    const [ipAddress, setIpAddress] = useState('');

    useEffect(() => {
        const fetchIpAddress = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                setIpAddress(data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };

        fetchIpAddress();

        // Cleanup function
        return () => {
            // Any cleanup if needed
        };
    }, []);

    return (
        <div>
            <h2>Your IP Address:</h2>
            <p>{ipAddress}</p>
        </div>
    );
};

export default Test1;