<?php
namespace App\Services;

use App\Models\User;

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
    public function findUserByName(string $userName) {
        $users = User::query();
        if(isset($userName)) {
            $users->where('fullname', 'LIKE', "%" . $userName . "%");
            $result = $users->orderBy('fullname')->paginate(30);
            return $result->getCollection();
        }
    }
    public function findUserByCondition($condition ) {
        $users = User::query();
        $users->where('role', $condition['role']);
        if(isset($condition['fullname'])) {
            $users->where('fullname', 'LIKE', "%" . $condition['fullname'] . "%");
        }
        // if(isset($page)) {
        //     $users->where('fullname');
        // }
        $result = $users->orderBy('fullname')->paginate(30);
        return $result->getCollection();
    }
}