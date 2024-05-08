<?php

namespace App\Helps;
class MediaData {
    protected $filePath;
    protected $type;
    function __construct($filePath)
    {   
        $this->filePath = $filePath;
    }
    function getFileType() {
        $fileExtension = strtolower(pathinfo($this->filePath, PATHINFO_EXTENSION));
    
        $imageExtensions = array('jpg', 'jpeg', 'png', 'gif', 'bmp');
        $videoExtensions = array('mp4', 'avi', 'mkv', 'mov', 'wmv');
    
        if (in_array($fileExtension, $imageExtensions)) {
            return 'image';
        } elseif (in_array($fileExtension, $videoExtensions)) {
            return 'video';
        } else {
            return 'Not available';
        }
    }
}