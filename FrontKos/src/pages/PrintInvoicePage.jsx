import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import easyinvoice from 'easyinvoice';

const PrintInvoicePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resident, setResident] = useState(null);
  const [roomName, setRoomName] = useState('');
  const [roomPricePerDay, setRoomPricePerDay] = useState(0);
  const [roomPricePerWeek, setRoomPricePerWeek] = useState(0);
  const [roomPricePerMonth, setRoomPricePerMonth] = useState(0);
  const [roomPricePerYear, setRoomPricePerYear] = useState(0);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchResidentDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/residents/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const residentData = response.data.data;
        setResident(residentData);

        // Fetch room name and prices based on resident's room ID
        fetchRoomDetails(residentData.id_kamar);
      } catch (error) {
        console.error("Error fetching resident details:", error);
        setError("Failed to fetch resident details. Please try again.");
      }
    };

    const fetchRoomDetails = async (roomId) => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const rooms = response.data.data;

        if (!Array.isArray(rooms)) {
          throw new Error("Rooms data is not in the expected format.");
        }

        const room = rooms.find(room => room.id === roomId);
        
        if (room) {
          setRoomName(room.nama_kamar);
          setRoomPricePerDay(room.harga_per_hari);
          setRoomPricePerWeek(room.harga_per_minggu);
          setRoomPricePerMonth(room.harga_per_bulan);
          setRoomPricePerYear(room.harga_per_tahun);
        } else {
          setError("Room not found with the given ID.");
        }
      } catch (error) {
        console.error("Error fetching room details:", error);
        setError("Failed to fetch room details. Please check the room ID or API.");
      }
    };

    fetchResidentDetails();
  }, [id, navigate]);

  const calculateTotalAmount = (residentData) => {
    const { lama_sewa, jenis_sewa_kamar } = residentData;

    let rate = 0;
    switch (jenis_sewa_kamar) {
      case 1: // Daily
        rate = roomPricePerDay;
        break;
      case 2: // Weekly
        rate = roomPricePerWeek;
        break;
      case 3: // Monthly
        rate = roomPricePerMonth;
        break;
      case 4: // Yearly
        rate = roomPricePerYear;
        break;
      default:
        break;
    }

    return lama_sewa * rate;
  };

  useEffect(() => {
    if (resident && roomPricePerDay !== 0) {
      const total = calculateTotalAmount(resident);
      setTotalAmount(total);
    }
  }, [resident, roomPricePerDay, roomPricePerWeek, roomPricePerMonth, roomPricePerYear]);

  const handleGenerateInvoice = async () => {
    const invoiceData = {
      "documentTitle": "Invoice", 
      "currency": "IDR",
      "taxNotation": "VAT",
      "marginTop": 25,
      "marginRight": 25,
      "marginLeft": 25,
      "marginBottom": 25,
      "sender": {
        "company": "Your Company Name",
        "address": "Company Address",
        "zip": "1234 AB",
        "city": "City Name",
        "country": "Country",
      },
      "client": {
        "company": resident.nama_penghuni,
        "address": `Room: ${roomName}`,
        "city": resident.no_handphone,
        "country": resident.jenis_kelamin === 1 ? 'Pria' : 'Wanita'
      },
      "invoiceNumber": id,
      "invoiceDate": new Date().toLocaleDateString(),
      "products": [
        {
          "quantity": resident.lama_sewa,
          "description": `Room Type: ${
            resident.jenis_sewa_kamar === 1 ? 'Harian' : 
            resident.jenis_sewa_kamar === 2 ? 'Mingguan' : 
            resident.jenis_sewa_kamar === 3 ? 'Bulanan' : 
            resident.jenis_sewa_kamar === 4 ? 'Tahunan' : 'Other'
          }`,
          "price": totalAmount / resident.lama_sewa,
        },
      ],
      "bottomNotice": "Thank you for your business!",
    };

    try {
      const result = await easyinvoice.createInvoice(invoiceData);
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

  if (!resident || roomPricePerDay === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="invoice">
        <h1 className="mb-4">Invoice for {resident.nama_penghuni}</h1>
        <p><strong>Room:</strong> {roomName}</p>
        <p><strong>Phone Number:</strong> {resident.no_handphone}</p>
        <p><strong>Gender:</strong> {resident.jenis_kelamin === 1 ? 'Pria' : 'Wanita'}</p>
        <p><strong>Rental Duration:</strong> {resident.lama_sewa}</p>
        <p><strong>Room Type:</strong> {
          (() => {
            switch (resident.jenis_sewa_kamar) {
              case 1: return 'Harian';
              case 2: return 'Mingguan';
              case 3: return 'Bulanan';
              case 4: return 'Tahunan';
              default: return 'Other';
            }
          })()
        }</p>
        <p><strong>Move-in Date:</strong> {resident.tanggal_masuk}</p>
        <p><strong>Total Amount Due:</strong> {formatRupiah(totalAmount)}</p>
        
        <button onClick={handleGenerateInvoice} className="btn btn-primary mt-3">Download PDF Invoice</button>
      </div>
    </div>
  );
};

export default PrintInvoicePage;
