import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import "./Laporan.css";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  subheader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "black",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2d63ba",
    color: "#ffffff",
  },
  tableHeaderCell: {
    width: "25%",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 12,
  },
  tableCell: {
    width: "25%",
    textAlign: "center",
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
});

function MyDocument({
  laporanData = [],
  settingData = [{}],
  kategoriCetak = "",
  laporanTahunIni = [],
  laporanTahunLalu = [],
}) {
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth(); // Mengetahui bulan saat ini (0-11)
  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  // Fungsi untuk mendapatkan nama bulan dari indeks (0-11)
  const getMonthName = (monthIndex) => {
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return months[monthIndex];
  };

  // Tentukan judul laporan berdasarkan kondisi data yang ada
  let judulLaporan = "";

  // Jika ada laporan bulanan
  // if (laporanData.length > 0) {
  // Cek apakah bulan ini ada data atau bulan lalu
  // const isBulanIni = laporanData.some((laporan) => {
  //   const laporanMonth = new Date(laporan.tanggal).getMonth();
  //   return laporanMonth === currentMonthIndex;
  // });

  // console.log("sdssd" + kategoriCetak);

  // const isBulanLalu = laporanData.some((laporan) => {
  //   const laporanMonth = new Date(laporan.tanggal).getMonth();
  //   return laporanMonth === currentMonthIndex - 1;
  // });

  if (kategoriCetak == "bulanini") {
    judulLaporan = `Laporan Bulanan - ${currentMonth}`;
  }

  if (kategoriCetak == "bulanlalu") {
    judulLaporan = `Laporan Bulanan - ${getMonthName(currentMonthIndex - 1)}`;
  }

  if (kategoriCetak == "tahunlalu") {
    judulLaporan = `Laporan Tahunan - Tahun  ${currentYear - 1}`;
  }

  // if (!judulLaporan && laporanTahunIni.length > 0) {
  if (kategoriCetak == "tahunini") {
    judulLaporan = `Laporan Tahunan - Tahun ${currentYear}`;
  }
  // }

  // Jika tidak ada laporan bulanan dan ada laporan tahunan

  // Jika tidak ada data sama sekali, tetap menggunakan default judul
  // if (!judulLaporan) {
  //   judulLaporan = `Laporan Tahunan f - Tahun ${currentYear}`;
  // }

  // Tentukan subheader untuk laporan tahunan atau bulanan
  const laporanType =
    laporanTahunIni.length > 0 || laporanTahunLalu.length > 0
      ? "Laporan Tahunan:"
      : "Laporan Bulanan:";

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.header}>{judulLaporan}</Text>
        <Text style={styles.text}>
          Tanggal Cetak: {new Date().toLocaleDateString()}
        </Text>

        <View style={styles.section}>
          <Text style={styles.subheader}>Informasi Kosan:</Text>
          <Text style={styles.text}>
            Nama Kosan: {settingData[0].nama_kost || "N/A"}
          </Text>
          <Text style={styles.text}>
            Alamat: {settingData[0].alamat || "N/A"}
          </Text>
          <Text style={styles.text}>
            No Telepon: {settingData[0].telepon || "N/A"}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Keterangan</Text>
              <Text style={styles.tableHeaderCell}>Nominal</Text>
              <Text style={styles.tableHeaderCell}>Tanggal</Text>
              <Text style={styles.tableHeaderCell}>Kategori</Text>
            </View>

            {/* Menampilkan laporan tahunan jika ada */}
            {laporanTahunIni.length > 0 || laporanTahunLalu.length > 0 ? (
              <>
                {laporanTahunIni.map((laporan, index) => (
                  <View style={styles.tableRow} key={`tahun-ini-${index}`}>
                    <Text style={styles.tableCell}>{laporan.keterangan}</Text>
                    <Text style={styles.tableCell}>
                      Rp {laporan.nominal.toLocaleString()}
                    </Text>
                    <Text style={styles.tableCell}>{laporan.tanggal}</Text>
                    <Text style={styles.tableCell}>{laporan.kategori}</Text>
                  </View>
                ))}
                {laporanTahunLalu.map((laporan, index) => (
                  <View style={styles.tableRow} key={`tahun-lalu-${index}`}>
                    <Text style={styles.tableCell}>{laporan.keterangan}</Text>
                    <Text style={styles.tableCell}>
                      Rp {laporan.nominal.toLocaleString()}
                    </Text>
                    <Text style={styles.tableCell}>{laporan.tanggal}</Text>
                    <Text style={styles.tableCell}>{laporan.kategori}</Text>
                  </View>
                ))}
              </>
            ) : (
              // Jika laporan bulanan, tampilkan data bulanan
              laporanData.map((laporan, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{laporan.keterangan}</Text>
                  <Text style={styles.tableCell}>
                    Rp {laporan.nominal.toLocaleString()}
                  </Text>
                  <Text style={styles.tableCell}>{laporan.tanggal}</Text>
                  <Text style={styles.tableCell}>{laporan.kategori}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}

function LaporanCard() {
  const [laporanBulanan, setLaporanBulanan] = useState(null);
  const [laporanBulanIni, setLaporanBulanIni] = useState([]);
  const [laporanBulanLalu, setLaporanBulanLalu] = useState([]);
  const [laporanTahunan, setLaporanTahunan] = useState(null);
  const [laporanTahunIni, setLaporanTahunIni] = useState([]);
  const [laporanTahunLalu, setLaporanTahunLalu] = useState([]);
  const [setting, setSetting] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [kategoriCetakTahunIni] = useState("tahunini");
  const [kategoriCetakBulanIni] = useState("bulanini");
  const [kategoriCetakBulanLalu] = useState("bulanlalu");
  const [kategoriCetakTahunLalu] = useState("tahunlalu");
  const [endDate, setEndDate] = useState("");

  const [activeTab, setActiveTab] = useState("bulanan");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/laporan-bulanan")
      .then((response) => {
        setLaporanBulanan(response.data.data);
      })
      .catch((error) =>
        console.error("Error fetching laporan bulanan:", error)
      );

    axios
      .get("http://localhost:8000/api/settings")
      .then((response) => {
        setSetting(response.data.data);
      })
      .catch((error) => console.error("Error fetching settings:", error));
  }, []);

  const handleCetak = () => {
    axios
      .get("http://localhost:8000/api/laporan-custom-range", {
        params: { start_date: startDate, end_date: endDate },
      })
      .then((response) => {
        const dataToPrint = response.data.data;

        // Pastikan data API memiliki properti yang diharapkan
        if (!dataToPrint) {
          alert("Tidak ada data untuk tanggal yang dipilih.");
          return;
        }

        // Membuka jendela cetak
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
          <html>
            <head>
              <title>Laporan Custom Range</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              <h1>Laporan Custom Range</h1>
              <p>Periode: ${startDate} - ${endDate}</p>
              <table>
                <thead>
                  <tr>
                    <th>Keterangan</th>
                    <th>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pemasukan</td>
                    <td>${dataToPrint.pemasukan}</td>
                  </tr>
                  <tr>
                    <td>Pengeluaran</td>
                    <td>${dataToPrint.pengeluaran}</td>
                  </tr>
                  <tr>
                    <td>Hasil</td>
                    <td>${dataToPrint.hasil}</td>
                  </tr>
                </tbody>
              </table>
            </body>
          </html>
        `);

        // Menutup dan mencetak
        printWindow.document.close();
        printWindow.print();
      })
      .catch((error) => {
        console.error("Error fetching laporan custom range:", error);
        alert("Terjadi kesalahan saat mengambil data: " + error.message);
      });
  };

  if (!laporanBulanan || !setting.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="laporan-container">
      <h2 className="judul-laporan">Laporan</h2>

      {/* Filter */}
      <div className="filter-container">
        <div className="filter-item">
          <label htmlFor="start-date">Start Date:</label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="filter-item">
          <label htmlFor="end-date">End Date:</label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button className="filter-button" onClick={handleCetak}>
          Cetak
        </button>
      </div>

      {/* Bootstrap Tabs */}
      <div className="tab-wrapper">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "bulanan" ? "active" : ""}`}
              onClick={() => setActiveTab("bulanan")}
              href="#"
            >
              <i className="fas fa-calendar"></i> Bulanan
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === "tahunan" ? "active" : ""}`}
              onClick={() => setActiveTab("tahunan")}
              href="#"
            >
              <i className="fas fa-calendar-alt"></i> Tahunan
            </a>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="card-container">
          {activeTab === "bulanan" && (
            <>
              <div className="card card-bulanan" id="bulan-ini-card">
                <h3 className="card-header">Laporan Bulan Ini</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="label label-pemasukan">Pemasukan:</span>
                    <span className="amount-pemasukan">
                      Rp{" "}
                      {laporanBulanan.bulan_ini?.pemasukan?.toLocaleString() ||
                        0}
                    </span>
                  </li>

                  <li className="list-group-item">
                    <span className="label label-pengeluaran">
                      Pengeluaran:
                    </span>
                    <span className="amount-pengeluaran">
                      Rp{" "}
                      {laporanBulanan.bulan_ini?.pengeluaran?.toLocaleString() ||
                        0}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="label label-hasil">Hasil:</span>
                    <span className="amount-hasil">
                      Rp{" "}
                      {(
                        (laporanBulanan.bulan_ini?.pemasukan || 0) -
                        (laporanBulanan.bulan_ini?.pengeluaran || 0)
                      ).toLocaleString()}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <div className="pdf-download-link">
                      <PDFDownloadLink
                        document={
                          <MyDocument
                            laporanData={laporanBulanIni}
                            kategoriCetak={kategoriCetakBulanIni}
                            settingData={setting}
                          />
                        }
                        fileName="laporan-bulan-ini.pdf"
                      >
                        {({ loading }) => (
                          <span className="cetak">
                            <i className="fas fa-print"></i> {/* Ikon print */}
                            {loading
                              ? "Mempersiapkan laporan..."
                              : "Cetak Bulan Ini"}
                          </span>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card card-bulanan" id="bulan-lalu-card">
                <h3 className="card-header">Laporan Bulan Lalu</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="label label-pemasukan">Pemasukan:</span>
                    <span className="amount-pemasukan">
                      Rp{" "}
                      {laporanBulanan.bulan_lalu?.pemasukan?.toLocaleString() ||
                        0}
                    </span>
                  </li>

                  <li className="list-group-item">
                    <span className="label label-pengeluaran">
                      Pengeluaran:
                    </span>
                    <span className="amount-pengeluaran">
                      Rp{" "}
                      {laporanBulanan.bulan_lalu?.pengeluaran?.toLocaleString() ||
                        0}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="label label-hasil">Hasil:</span>
                    <span className="amount-hasil">
                      Rp{" "}
                      {(
                        (laporanBulanan.bulan_lalu?.pemasukan || 0) -
                        (laporanBulanan.bulan_lalu?.pengeluaran || 0)
                      ).toLocaleString()}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <div className="pdf-download-link">
                      <PDFDownloadLink
                        document={
                          <MyDocument
                            laporanData={laporanBulanLalu}
                            settingData={setting}
                            kategoriCetak={kategoriCetakBulanLalu}
                          />
                        }
                        fileName="laporan-bulan-lalu.pdf"
                      >
                        {({ loading }) => (
                          <span className="cetak">
                            <i className="fas fa-print"></i> {/* Ikon print */}
                            {loading
                              ? "Mempersiapkan laporan..."
                              : "Cetak Bulan Lalu"}
                          </span>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* LAPORAN TAHUNAN */}
          {activeTab === "tahunan" && (
            <>
              <div className="card card-tahunan " id="tahun-ini-card">
                <h3 className="card-header"> Laporan Tahun Ini</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="label">Pemasukan:</span>
                    <span className="amount-pemasukan">
                      Rp{" "}
                      {laporanTahunan.tahun_ini?.pemasukan?.toLocaleString() ||
                        0}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="label">Pengeluaran:</span>
                    <span className="amount-pengeluaran">
                      Rp{" "}
                      {laporanTahunan.tahun_ini?.pengeluaran?.toLocaleString() ||
                        0}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="label">Hasil</span>
                    <span className="amount-hasil">
                      Rp{" "}
                      {laporanTahunan.tahun_ini?.sisa_saldo?.toLocaleString() ||
                        0}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <div className="pdf-download-link">
                      <PDFDownloadLink
                        document={
                          <MyDocument
                            laporanData={laporanTahunIni}
                            kategoriCetak={kategoriCetakTahunIni}
                            settingData={setting}
                          />
                        }
                        fileName="laporan-tahun-ini.pdf"
                      >
                        {({ loading }) => (
                          <span className="cetak">
                            <i className="fas fa-print"></i> {/* Ikon print */}
                            {loading
                              ? "Mempersiapkan laporan..."
                              : "Cetak Tahun Ini"}
                          </span>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card card-tahunan" id="tahun-lalu-card">
                <h3 className="card-header"> Laporan Tahun Lalu</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <span className="label">Pemasukan:</span>
                    <span className="amount-pemasukan">
                      Rp{" "}
                      {laporanTahunan.tahun_lalu?.pemasukan?.toLocaleString() ||
                        0}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="label">Pengeluaran:</span>
                    <span className="amount-pengeluaran">
                      Rp{" "}
                      {laporanTahunan.tahun_lalu?.pengeluaran?.toLocaleString() ||
                        0}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="label">Hasil:</span>
                    <span className="amount-hasil">
                      Rp{" "}
                      {laporanTahunan.tahun_lalu?.sisa_saldo?.toLocaleString() ||
                        0}
                    </span>
                  </li>
                  <li className="list-group-item">
                    <div className="pdf-download-link">
                      <PDFDownloadLink
                        document={
                          <MyDocument
                            laporanData={laporanTahunLalu}
                            settingData={setting}
                            kategoriCetak={kategoriCetakTahunLalu}
                          />
                        }
                        fileName="laporan-tahun-lalu.pdf"
                      >
                        {({ loading }) => (
                          <span className="cetak">
                            <i className="fas fa-print"></i> {/* Ikon print */}
                            {loading
                              ? "Mempersiapkan laporan..."
                              : "Cetak Tahun Lalu"}
                          </span>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LaporanCard;
