import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [dashboardCount, setDashboardCount] = useState({});
    const [totalRooms, setTotalRooms] = useState(0);
    const [income, setIncome] = useState(0);
    const [todayDate, setTodayDate] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        // Set tanggal hari ini
        const currentDate = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setTodayDate(currentDate);

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const dashboardResponse = await axios.get('http://127.0.0.1:8000/api/dashboard/kamar-terisi', config);
                const roomsResponse = await axios.get('http://127.0.0.1:8000/api/residents', config);
                const incomeResponse = await axios.get('http://127.0.0.1:8000/api/payments', config);

                setDashboardCount(dashboardResponse.data.data);
                const rooms = roomsResponse.data.data;
                setTotalRooms(rooms.length);
                setIncome(incomeResponse.data.data?.reduce((sum, payment) => sum + payment.jumlah_bayar, 0) || 0);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard">
            <div className="card purple" onClick={() => navigate('/resident')}>
                <div className="card-content">
                    <h3>Kamar Terisi</h3>
                    <p>{dashboardCount.total_kamar_terisi || 0}</p>
                    <span>Penghuni</span>
                </div>
                <i className="icon bed-icon"></i>
            </div>
            <div className="card yellow" onClick={() => navigate('/room')}>
                <div className="card-content">
                    <h3>Kamar Kosong</h3>
                    <p>{dashboardCount.total_kamar_kosong || 0}</p>
                    <span>dari {totalRooms} Kamar</span>
                </div>
                <i className="icon door-icon"></i>
            </div>
            <div className="card green" onClick={() => navigate('/payment')}>
                <div className="card-content">
                    <h3>Pemasukan</h3>
                    <p>Rp. {income.toLocaleString()}</p>
                    <span>{todayDate}</span>
                </div>
                <i className="icon income-icon"></i>
            </div>
            <div className="card red">
                <div className="card-content">
                    <h3>Pengeluaran</h3>
                    <p>Rp. -</p>
                    <span>{todayDate}</span>
                </div>
                <i className="icon expense-icon"></i>
            </div>
        </div>
    );
};

export default Dashboard;
