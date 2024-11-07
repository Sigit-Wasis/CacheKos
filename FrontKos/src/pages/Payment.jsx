import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Placeholder from 'react-bootstrap/Placeholder';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Payment.css';  // Add this line for the custom styles

const Payment = () => {
    const { id } = useParams();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8000/api/payments`)
            .then(response => {
                setPayments(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Gagal memuat data pembayaran');
                setLoading(false);
            });
    }, []);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    if (loading) {
        return (
            <div className="container text-center mt-5">
                {/* Placeholder untuk judul tabel */}
                <Placeholder as="h2" animation="wave">
                    <Placeholder xs={6} />
                </Placeholder>
                
                {/* Placeholder untuk tabel daftar pembayaran */}
                <div className="table-responsive shadow-lg rounded bg-white p-4 mt-4">
                    <table className="table table-hover table-bordered">
                        <thead className="table-primary text-center">
                            <tr>
                                <th scope="col">
                                    <Placeholder as="span" animation="wave"><Placeholder xs={4} /></Placeholder>
                                </th>
                                <th scope="col">
                                    <Placeholder as="span" animation="wave"><Placeholder xs={4} /></Placeholder>
                                </th>
                                <th scope="col">
                                    <Placeholder as="span" animation="wave"><Placeholder xs={4} /></Placeholder>
                                </th>
                                <th scope="col">
                                    <Placeholder as="span" animation="wave"><Placeholder xs={4} /></Placeholder>
                                </th>
                                <th scope="col">
                                    <Placeholder as="span" animation="wave"><Placeholder xs={4} /></Placeholder>
                                </th>
                                <th scope="col">
                                    <Placeholder as="span" animation="wave"><Placeholder xs={4} /></Placeholder>
                                </th>
                                <th scope="col">
                                    <Placeholder as="span" animation="wave"><Placeholder xs={4} /></Placeholder>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index} className="text-center align-middle">
                                    <td><Placeholder as="p" animation="wave"><Placeholder xs={6} /></Placeholder></td>
                                    <td><Placeholder as="p" animation="wave"><Placeholder xs={6} /></Placeholder></td>
                                    <td><Placeholder as="p" animation="wave"><Placeholder xs={6} /></Placeholder></td>
                                    <td><Placeholder as="p" animation="wave"><Placeholder xs={6} /></Placeholder></td>
                                    <td><Placeholder as="p" animation="wave"><Placeholder xs={6} /></Placeholder></td>
                                    <td><Placeholder as="p" animation="wave"><Placeholder xs={6} /></Placeholder></td>
                                    <td><Placeholder as="p" animation="wave"><Placeholder xs={6} /></Placeholder></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container text-center mt-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="text-center my-4 display-6 custom-font-weight">Daftar Pemasukkan</h2>
            <div className="table-responsive shadow-lg rounded bg-white p-4 mt-4">
                <table className="table table-hover table-bordered">
                    <thead className="table-primary text-center">
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
                        {payments.length > 0 ? (
                            payments.map(payment => (
                                <tr key={payment.id} className="text-center align-middle">
                                    <td>{payment.invoice}</td>
                                    <td>{payment.tanggal}</td>
                                    <td>{formatPrice(payment.jumlah_bayar)}</td>
                                    <td>
                                        <span className={`badge ${payment.status === 'Lunas' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td>{formatPrice(payment.kurang_bayar)}</td>
                                    <td>{formatPrice(payment.grand_total)}</td>
                                    <td>{payment.keterangan}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    <em>Data pembayaran tidak tersedia.</em>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payment;
