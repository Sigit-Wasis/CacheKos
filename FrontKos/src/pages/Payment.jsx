import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payment.css';

const Payment = () => {
    const [payments, setPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterStatus, setFilterStatus] = useState(''); // Filter status
    const [selectedPayment, setSelectedPayment] = useState(null); // New state for selected payment
    const [modalVisible, setModalVisible] = useState(false); // New state for modal visibility

    // Fetch data
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

    // Format harga
    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Filter pembayaran berdasarkan status
    const filteredPayments = filterStatus
        ? payments.filter(payment => payment.status.toLowerCase() === filterStatus.toLowerCase())
        : payments;

    // Pagination logic
    const indexOfLastPayment = currentPage * paymentsPerPage;
    const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
    const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Show payment details in modal
    const handleRowClick = (payment) => {
        setSelectedPayment(payment);
        setModalVisible(true);
    };

    // Close modal
    const closeModal = () => {
        setModalVisible(false);
        setSelectedPayment(null);
    };

    if (loading) {
        return (
            <div className="container py-5">
                <h2 className="text-center my-4 display-6 custom-font-weight">Daftar Pemasukkan</h2>
                {/* Loading Placeholder */}
                <div className="table-responsive shadow-lg rounded bg-white p-4 mt-4">
                    <table className="table table-hover table-bordered">
                        <thead className="table-primary text-center">
                            <tr>
                                {['Invoice', 'Tanggal', 'Jumlah Bayar', 'Status', 'Kurang Bayar', 'Total', 'Keterangan'].map(header => (
                                    <th key={header} scope="col">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(5)].map((_, index) => (
                                <tr key={index}>
                                    {[...Array(7)].map((_, cellIndex) => (
                                        <td key={cellIndex}><div className="loading-placeholder-item"></div></td>
                                    ))}
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
            <div className="search-container d-flex justify-content-end mb-3">
                <select
                    className="form-select w-auto"
                    value={filterStatus}
                    onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1); // Reset ke halaman pertama
                    }}
                >
                    <option value="">Semua Status</option>
                    <option value="Lunas">Lunas</option>
                    <option value="Belum Lunas">Belum Lunas</option>
                </select>
            </div>
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
                        {currentPayments.map(payment => (
                            <tr key={payment.id} className="text-center align-middle" onClick={() => handleRowClick(payment)}>
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
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                paymentsPerPage={paymentsPerPage}
                totalPayments={filteredPayments.length}
                paginate={paginate}
                currentPage={currentPage}
            />

            {/* Modal for payment details */}
            {modalVisible && selectedPayment && (
                <div className="modal show" style={{ display: 'block' }} aria-labelledby="paymentModal" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detail Pembayaran</h5>
                                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Invoice:</strong> {selectedPayment.invoice}</p>
                                <p><strong>Tanggal:</strong> {selectedPayment.tanggal}</p>
                                <p><strong>Jumlah Bayar:</strong> {formatPrice(selectedPayment.jumlah_bayar)}</p>
                                <p><strong>Status:</strong> {selectedPayment.status}</p>
                                <p><strong>Kurang Bayar:</strong> {formatPrice(selectedPayment.kurang_bayar)}</p>
                                <p><strong>Total:</strong> {formatPrice(selectedPayment.grand_total)}</p>
                                <p><strong>Keterangan:</strong> {selectedPayment.keterangan}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Pagination Component
const Pagination = ({ paymentsPerPage, totalPayments, paginate, currentPage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPayments / paymentsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4 d-flex justify-content-between align-items-center">
            <span className="text-muted">Page {currentPage} of {pageNumbers.length}</span>
            <ul className="pagination justify-content-center mb-0">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === pageNumbers.length}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Payment;
