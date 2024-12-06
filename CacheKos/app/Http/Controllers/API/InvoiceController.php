<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Resident;
use App\Models\Room;
use Carbon\Carbon;

class InvoiceController extends Controller
{
    public function printInvoice($id)
    {
        // Retrieve resident data by ID
        $resident = Resident::find($id);

        if (!$resident) {
            return response()->json(['message' => 'Resident not found'], 404);
        }

        // Retrieve related data
        $paymentData = $this->getPaymentData($resident);
        $roomDetails = $this->getRoomDetails($resident);
        $rentalDuration = $this->getRentalDuration($resident);
        $moveOutDate = $this->getMoveOutDate($resident);

        // Calculate total amount
        $totalAmount = $this->calculateTotalAmount($resident);

        return response()->json([
            'message' => 'Invoice data fetched successfully',
            'data' => [
                'resident' => $resident,
                'paymentData' => $paymentData,
                'roomDetails' => $roomDetails,
                'rentalDuration' => $rentalDuration,
                'moveOutDate' => $moveOutDate,
                'totalAmount' => $totalAmount,
            ],
        ], 200);
    }

    private function getPaymentData($resident)
    {
        return [
            'amount_due' => 1000, // Example: replace with actual calculation
            'payment_status' => 'Paid',
        ];
    }

    private function getRoomDetails($resident)
    {
        $room = Room::find($resident->id_kamar);

        if (!$room) {
            return [
                'room_type' => 'Unknown',
                'room_number' => $resident->id_kamar,
                'harga_per_hari' => 0,
                'harga_per_minggu' => 0,
                'harga_per_bulan' => 0,
                'harga_per_tahun' => 0,
            ];
        }

        return [
            'room_type' => $room->nama_kamar,
            'room_number' => $room->id,
            'harga_per_hari' => $room->harga_per_hari,
            'harga_per_minggu' => $room->harga_per_minggu,
            'harga_per_bulan' => $room->harga_per_bulan,
            'harga_per_tahun' => $room->harga_per_tahun,
        ];
    }

    private function getRentalDuration($resident)
    {
        return $resident->lama_sewa . ' ' . ['Hari', 'Minggu', 'Bulan', 'Tahun'][$resident->jenis_sewa_kamar - 1];
    }

    private function getMoveOutDate($resident)
    {
        $moveInDate = Carbon::parse($resident->tanggal_masuk);
        $lamaSewa = $resident->lama_sewa;

        switch ($resident->jenis_sewa_kamar) {
            case 1: // Daily
                return $moveInDate->addDays($lamaSewa)->format('Y-m-d');
            case 2: // Weekly
                return $moveInDate->addWeeks($lamaSewa)->format('Y-m-d');
            case 3: // Monthly
                return $moveInDate->addMonths($lamaSewa)->format('Y-m-d');
            case 4: // Yearly
                return $moveInDate->addYears($lamaSewa)->format('Y-m-d');
            default:
                return $moveInDate->format('Y-m-d');
        }
    }

    private function calculateTotalAmount($resident)
    {
        $room = $this->getRoomDetails($resident);
        $price = 0;

        switch ($resident->jenis_sewa_kamar) {
            case 1: $price = $room['harga_per_hari']; break;
            case 2: $price = $room['harga_per_minggu']; break;
            case 3: $price = $room['harga_per_bulan']; break;
            case 4: $price = $room['harga_per_tahun']; break;
            default: $price = 0;
        }

        return $resident->lama_sewa * $price;
    }
}
