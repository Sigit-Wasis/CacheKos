import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import easyinvoice from 'easyinvoice';

const PrintInvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [roomSettings, setRoomSettings] = useState(null); // State for room settings data

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchInvoiceData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/invoice/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvoiceData(response.data.data);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        setError("Failed to fetch invoice data. Please try again.");
      }
    };

    const fetchRoomSettings = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/settings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRoomSettings(response.data.data[0]); // Assuming the first item is the room setting
      } catch (error) {
        console.error("Error fetching room settings:", error);
        setError("Failed to fetch room settings.");
      }
    };

    fetchInvoiceData();
    fetchRoomSettings();
  }, [id, navigate]);

  const handleGenerateInvoice = async () => {
    if (!invoiceData || !roomSettings) return;

    const { resident, roomDetails, paymentData, rentalDuration, moveOutDate, totalAmount } = invoiceData;
    const { nama_kost, alamat,email } = roomSettings; // Get company name and address from roomSettings

    const invoiceDataForGeneration = {
      documentTitle: "Invoice",
      currency: "IDR",
      taxNotation: "VAT",
      marginTop: 25,
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 25,
      sender: {
        company: nama_kost, // Use the fetched company name
        address: alamat, // Use the fetched address
        zip: email,
        
      },
      client: {
        company: resident.nama_penghuni,
        address: `Room: ${roomDetails.room_number}`,
        city: resident.no_handphone,
        country: resident.jenis_kelamin === 1 ? 'Pria' : 'Wanita',
      },
      invoiceNumber: id,
      invoiceDate: new Date().toLocaleDateString(),
      paymentDate: paymentData.payment_date,
      products: [
        {
          description: `Lama sewa : ${rentalDuration} | Tanggal Keluar: ${moveOutDate}`,
          price: totalAmount / resident.lama_sewa,
        },
      ],
      bottomNotice: "Thank you for your business!",
    };

    try {
      const result = await easyinvoice.createInvoice(invoiceDataForGeneration);
      easyinvoice.download(`Invoice_${id}.pdf`, result.pdf);
    } catch (error) {
      console.error("Error generating invoice:", error);
      setError("Failed to generate the invoice.");
    }
  };

  const formatRupiah = (amount) => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!invoiceData || !roomSettings) {
    return <p>Loading...</p>;
  }

  const { resident, roomDetails, rentalDuration, moveOutDate, totalAmount, paymentData } = invoiceData;

  return (
    <div className="container mt-5">
      <div className="invoice">
        <h1 className="mb-4">Invoice for {resident.nama_penghuni}</h1>
        <p><strong>Room Number:</strong> {roomDetails.room_number}</p>
        <p><strong>Phone Number:</strong> {resident.no_handphone}</p>
        <p><strong>Gender:</strong> {resident.jenis_kelamin === 1 ? 'Pria' : 'Wanita'}</p>
        <p><strong>Rental Duration:</strong> {rentalDuration}</p>
        <p><strong>Move-out Date:</strong> {moveOutDate}</p>
        <p><strong>Total Amount Due:</strong> {formatRupiah(totalAmount)}</p>
        <p><strong>Payment Date:</strong> {paymentData.payment_date ? paymentData.payment_date : 'Not paid yet'}</p>

        <button onClick={handleGenerateInvoice} className="btn btn-primary mt-3">Download PDF Invoice</button>
      </div>
    </div>
  );
};

export default PrintInvoicePage;
