import React from 'react';
import Hensol from '../hensol.jpg';
import Navbar from '../components/navbar';

export default function Home() {
    return (
        <div>
            <Navbar />
            <img src={Hensol} alt="Hensol Castle" width="100%" />
        </div>
    );
}

