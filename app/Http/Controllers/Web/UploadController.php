<?php

namespace App\Http\Controllers\Web;

use App\Helps\ResponseData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Web\UploadFileRequest;
use App\Http\Requests\Web\UploadMultipleFileRequest;
use App\Services\UploadService;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    /**
     * @var UploadService
     */
    private $uploadService;

    public function __construct(UploadService $uploadService)
    {
        $this->uploadService = $uploadService;
    }

    public function upload(UploadFileRequest $request)
    {
        // return 'this is upload';
        // dd($request->file('file'));
        try {
            $path = $this->uploadService->uploadFile('temporary', $request->file('file'));
            $response = (new ResponseData())->setStatus(true)
                ->setMessage("Upload file thành công")
                ->setData([
                    'path' => $path,
                    'full_path' => url('storage' . $path),
                ])
                ->getBodyResponse();

            return response()->json($response);
        } catch (\Exception $ex) {
            return response()->json($$ex->getMessage());
        }
    }

    public function uploadMultiple(UploadMultipleFileRequest $request)
    {
        try {
            $paths = [];
            $files = $request->file('files');
            // dd($files);
            foreach ($files as $file) {
                $path = $this->uploadService->uploadFile('temporary', $file);
                $paths[] = [
                    'path' => $path,
                    'full_path' => url('storage' . $path),
                ];
            }


            $response = (new ResponseData())->setStatus(true)
                ->setMessage("Upload file thành công")
                ->setData($paths)
                ->getBodyResponse();

            return response()->json($response);
        } catch (\Exception $ex) {
            return response()->json($$ex->getMessage());
        }
    }
}
