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

    public function getFollowers(string $userId) {
        $followers = User::whereIn('id', function ($query) use ($userId) {
            $query->select('following_user_id')
                ->from('follows')
                ->where('followed_user_id', $userId);
        })->get();
        return $followers;
    }


    public function getFollowing(string $userId) {
        $followers = User::whereIn('id', function ($query) use ($userId) {
            $query->select('followed_user_id')
                ->from('follows')
                ->where('following_user_id', $userId);
        })->get();
        return $followers;
    }

}