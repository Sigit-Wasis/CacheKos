import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';

const Dashboard = () => {
    const [dashboardCount, setDashboardCount] = useState({});
    const [totalRooms, setTotalRooms] = useState(0);
    const [income, setIncome] = useState(0);
    const [monthlyData, setMonthlyData] = useState({ paymentsByMonth: [], expensesByMonth: [] });
    const [todayDate, setTodayDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        // Set current date
        const currentDate = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        setTodayDate(currentDate);

        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const config = { headers: { Authorization: `Bearer ${token}` } };

                const dashboardResponse = await axios.get('http://127.0.0.1:8000/api/dashboard/kamar-terisi', config);
                setDashboardCount(dashboardResponse.data.data);
                setTotalRooms(dashboardResponse.data.data.total_kamar_terisi + dashboardResponse.data.data.total_kamar_kosong);
                setIncome(dashboardResponse.data.data.total_pemasukan);

                const monthlyIncome = Array.from({ length: 12 }, (_, i) => dashboardResponse.data.data.monthly_income[i + 1] || 0);
                const monthlyExpenses = Array.from({ length: 12 }, (_, i) => dashboardResponse.data.data.monthly_expenses[i + 1] || 0);

                setMonthlyData({ paymentsByMonth: monthlyIncome, expensesByMonth: monthlyExpenses });

                const almostExpired = dashboardResponse.data.data.sewa_hampir_habis.map(resident => {
                    const rentalStartDate = new Date(resident.tanggal_masuk);
                    const rentalEndDate = new Date(rentalStartDate.setMonth(rentalStartDate.getMonth() + parseInt(resident.lama_sewa)));
                    const daysLeft = Math.floor((rentalEndDate - new Date()) / (1000 * 60 * 60 * 24));

                    return { ...resident, daysLeft };
                }).filter(resident => resident.daysLeft <= 3);

                setNotifications(almostExpired);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const closeNotification = () => {
        setIsNotificationVisible(false);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        if (!isNotificationVisible) {
            document.querySelector('.dashboard').classList.add('notification-visible');
        }
    }, [isNotificationVisible]);

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            { label: 'Pemasukan', data: monthlyData.paymentsByMonth, backgroundColor: 'green' },
            { label: 'Pengeluaran', data: monthlyData.expensesByMonth, backgroundColor: 'red' },
        ],
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard" style={{ paddingTop: isNotificationVisible ? '120px' : '60px' }}>
            {/* Notifikasi masa sewa habis */}
            {isNotificationVisible && notifications.length > 0 && (
                <div className="alert-container"> 
                    <div className="alert alert-warning">
                        <strong>Perhatian!</strong>
                        {notifications.map((resident, index) => (
                            <p key={index}>
                                Penghuni <strong>{resident.nama_penghuni}</strong> (Kamar {resident.id_kamar})
                                akan habis masa sewanya dalam {resident.daysLeft} hari.
                            </p>
                        ))}
                        <button className="close-btn" onClick={closeNotification}>Tutup</button>
                    </div>
                </div>
            )}

            {/* Dashboard Cards */}
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
            <div className="card red"onClick={() => navigate('/expense')}>
                <div className="card-content">
                    <h3>Pengeluaran</h3>
                    <p>Rp.-</p>
                    <span>{todayDate}</span>
                </div>
                <i className="icon expense-icon"></i>
            </div>
            <div className="chart-container">
                <h3>Keuangan 2024</h3>
                <p>Grafik Keuangan Bulanan Tahun 2024.</p>
                <Bar data={chartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default Dashboard;
