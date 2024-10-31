<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
    /**
     * Send a success response.
     *
     * @param mixed $result
     * @param string $message
     * @return JsonResponse
     */
    public function sendResponse($result, $message = 'Operation successful'): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $result,
            'message' => $message,
        ], 200);
    }

    /**
     * Send an error response.
     *
     * @param string $error
     * @param array $errorMessages
     * @param int $code
     * @return JsonResponse
     */
    public function sendError($error, $errorMessages = [], $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}

use App\Http\Controllers\BaseController;

class ResidentController extends BaseController
{
    public function index()
    {
        $residents = Resident::all();
        return $this->sendResponse($residents, 'Residents retrieved successfully.');
    }

    public function store(Request $request)
    {
        $request->validate([
            // ... validation rules
        ]);

        $resident = Resident::create($request->all());
        return $this->sendResponse($resident, 'Resident created successfully.');
    }

    public function show($id)
    {
        $resident = Resident::find($id);

        if (is_null($resident)) {
            return $this->sendError('Resident not found.');
        }

        return $this->sendResponse($resident, 'Resident retrieved successfully.');
    }

    public function update(Request $request, $id)
    {
        $resident = Resident::find($id);

        if (is_null($resident)) {
            return $this->sendError('Resident not found.');
        }

        $request->validate([
            // ... validation rules
        ]);

        $resident->update($request->all());
        return $this->sendResponse($resident, 'Resident updated successfully.');
    }

    public function destroy($id)
    {
        $resident = Resident::find($id);

        if (is_null($resident)) {
            return $this->sendError('Resident not found.');
        }

        $resident->delete();
        return $this->sendResponse([], 'Resident deleted successfully.');
    }
}
