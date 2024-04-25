<?php


namespace App\Services;

// use FFMpeg\Format\Video\X264;
use Illuminate\Support\Facades\Storage;
// use Intervention\Image\Facades\Image;
// use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;

class UploadService
{
    public function upload($file, $directory = 'temporary') {

        if (!Storage::exists($directory)) {
            Storage::makeDirectory($directory);
        }

        $filename = $file->hashName();

        $path = Storage::putFileAs($directory, $file, $filename);

        return $path;
    }

    public function move($from, $folder) {

        if (!Storage::exists($from)) {
             throw new \Exception('Không tìm thấy tệp tin');
        }

        if (!Storage::exists($folder)) {
            Storage::makeDirectory($folder);
        }

        $to = $folder . '/' . basename($from);

        Storage::move($from, $to);

        return $to;
    }

    public function delete(array $files) {
        foreach ($files as $file) {
            if (Storage::exists($file)) {
                Storage::delete($file);
            }
        }
    }

    public function uploadFile($folder = 'temporary', $file) {
        if ($folder === 'temporary') {
            $folder = '/'. 'temporary' . '/' . now()->format('Y/m/d');
        }

        if (!Storage::disk(config('constants.disk_default'))->exists($folder)) {
            Storage::disk(config('constants.disk_default'))->makeDirectory($folder);
        }

        $fileName = \Illuminate\Support\Str::random(12) . time() . $file->getBasename() .'.' . $file->getClientOriginalExtension();

        Storage::disk(config('constants.disk_default'))->putFileAs($folder, $file, $fileName);

        return $folder . '/' . $fileName;
    }

    public function realUpload(string $folder, string $file = null, array $option = []) {

        if (empty($file)) {
            return '';
        }

        if (!Storage::disk(config('constants.disk_default'))->exists($file)) {
            return  '';
        }

        $folder = $this->getUploadFolder($folder, $option);
        Storage::disk(config('constants.disk_default'))->makeDirectory($folder);
        $path   =  $folder . '/' . basename($file);
        $this->moveFile($file, $path);

        return $path;
    }

    public function getUploadFolder(string $folder, array $option = []) {
        return $folder . implode('-', $option);
    }

    public function deleleFile(array $del) {
        foreach ($del as $item) {
            if (Storage::disk(config('constants.disk_default'))->exists($item)) {
                Storage::disk(config('constants.disk_default'))->delete($item);
            }
        }
    }

    public function deleteDirectory($folder) {
        Storage::disk(config('constants.disk_default'))->deleteDirectory($folder);
    }

    public function checkIsExists($file, $folder) {

        $newFile = $folder . '/' . basename($file);
        if (!Storage::disk(config('constants.disk_default'))->exists($newFile)) {
            return false;
        }

        return true;
    }

    public function handleUpdateFile($new, $odd, $folder) {

        $result = '';
        if ($new != $odd && !empty($odd)) {

            $result = $this->realUpload($folder, $new);
//            $this->deleleFile([$odd]);
        }

//        if (empty($new) && !empty($odd)) {
//            $this->deleleFile([$odd]);
//        }

        if (!empty($new) && empty($odd)) {
            $result = $this->realUpload($folder, $new);
        }

        if ($new == $odd) {
            $result = $new;
        }

        return $result;
    }

    public function handleDeleteUpdateFile ($new, $odd) {
        if ($new != $odd && !empty($odd)) {
            $this->deleleFile([$odd]);
        }
    }

    public function getFileSave($new, $folder) {

        if ($this->checkIsExists($new, $folder)) {
            return $new;
        }

        return $this->realUpload($folder, $new);
    }

    public function moveFile($from, $to) {
        if (!Storage::disk(config('constants.disk_default'))->exists($from)) {
            throw new \Exception("Không tìm thấy tệp tin");
        }

        Storage::disk(config('constants.disk_default'))->move($from, $to);
    }
}
