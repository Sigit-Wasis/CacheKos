import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RoomList = () => {
    const { id } = useParams();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8000/api/payments`)
            .then(response => {
                console.log('Response:', response.data);
                setPayments(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Failed to load payments data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="container text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="container text-center mt-5 text-danger">{error}</div>;
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="container">
            <h2 className="text-center mt-5">Daftar Pembayaran</h2>
            <div className="table-responsive mt-4">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Invoice</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Jumlah Bayar</th>
                            <th scope="col">Status</th>
                            <th scope="col">Kurang Bayar</th>
                            <th scope="col">Total</th>
                            <th scope="col">Keterangan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.invoice}</td>
                                <td>{payment.tanggal}</td>
                                <td>{formatPrice(payment.jumlah_bayar)}</td>
                                <td>{payment.status}</td>
                                <td>{formatPrice(payment.kurang_bayar)}</td>
                                <td>{formatPrice(payment.grand_total)}</td>
                                <td>{payment.keterangan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoomList;