import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';  // Gaya khusus untuk dashboard

const Dashboard = () => {
    const [residentCount, setResidentCount] = useState(0);
    const [totalRooms, setTotalRooms] = useState(0);
    const [occupiedRooms, setOccupiedRooms] = useState(0);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token"); // Ambil token dari storage
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
        
                const residentsResponse = await axios.get('http://127.0.0.1:8000/api/residents', config);
                const roomsResponse = await axios.get('http://127.0.0.1:8000/api/residents', config);
                const paymentsResponse = await axios.get('http://localhost:8000/api/payments', config);
                const expensesResponse = await axios.get('http://localhost:8000/api/expenses', config);
        
                // Cek respons data
                console.log("Residents:", residentsResponse.data);
                console.log("Rooms:", roomsResponse.data);
                console.log("Payments:", paymentsResponse.data);
                console.log("Expenses:", expensesResponse.data);
        
                setResidentCount(residentsResponse.data.data.length);
                const rooms = roomsResponse.data.data;
                setTotalRooms(rooms.length); 
                setOccupiedRooms(rooms.filter(room => room.occupied).length);  // Jika data kamar ada status terisi
                setIncome(paymentsResponse.data.data.total_income);
                setExpenses(expensesResponse.data.data.total_expenses);
        
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
            <div className="card purple">
                <div className="card-content">
                    <h3>Kamar Terisi</h3>
                    <p>{occupiedRooms}</p>
                    <span>Penghuni: {residentCount}</span>
                </div>
                <i className="icon bed-icon"></i>
            </div>
            <div className="card yellow">
                <div className="card-content">
                    <h3>Kamar Kosong</h3>
                    <p>{totalRooms - occupiedRooms}</p>
                    <span>dari {totalRooms} Kamar</span>
                </div>
                <i className="icon door-icon"></i>
            </div>
            <div className="card green">
                <div className="card-content">
                    <h3>Pemasukan</h3>
                    <p>Rp. {income.toLocaleString()}</p>
                    <span>November 2024</span>
                </div>
                <i className="icon income-icon"></i>
            </div>
            <div className="card red">
                <div className="card-content">
                    <h3>Pengeluaran</h3>
                    <p>Rp. {expenses.toLocaleString()}</p>
                    <span>November 2024</span>
                </div>
                <i className="icon expense-icon"></i>
            </div>
        </div>
    );
};

export default Dashboard;
