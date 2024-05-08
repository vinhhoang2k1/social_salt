<?php

namespace App\Http\Controllers\Web;

use App\Helps\MediaData;
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
        try {
            $path = $this->uploadService->uploadFile('temporary', $request->file('file'));
            $response = (new ResponseData())->setStatus(true)
                ->setMessage("Upload file thành công")
                ->setData([
                    'path' => $path,
                    'type' => (new MediaData($path))->getFileType()
                ])
                ->getBodyResponse();
            return redirect()->back()
                ->with([
                    'success' => 'Upload success',
                    'uploads' => $response
                ]);
        } catch (\Exception $ex) {
            return response()->json($$ex->getMessage());
        }
    }

    public function uploadMultiple(UploadMultipleFileRequest $request)
    {
        try {
            $paths = [];
            $files = $request->file('files');
            foreach ($files as $file) {
                $path = $this->uploadService->uploadFile('temporary', $file);
                $paths[] = [
                    'path' => $path,
                    'type' => (new MediaData($path))->getFileType()
                ];
            }

            $response = (new ResponseData())->setStatus(true)
                ->setMessage("Upload file thành công")
                ->setData($paths)
                ->getBodyResponse();

            return redirect()->back()
                ->with([
                    'success' => 'Upload success',
                    'uploads' => $response
                ]);
        } catch (\Exception $ex) {
            return response()->json($$ex->getMessage());
        }
    }
}
