<?php
namespace App\Services;

class UserService {
    private $uploadService;
    public function __construct(UploadService $uploadService)
    {
        $this->uploadService =  $uploadService;
    }
    public function deleteOldAvatar($path) {
        $this->uploadService->deleleFile($path);
    }
    public function saveAvatarFile($file) {   
        $data['file'] = $this->uploadService->forceUpload('avatar', $file);
        if($data['file']) {
            return $data['file'];
        }else {
            return '';
        }
    }
}