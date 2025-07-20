<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$imageDir = 'images/';
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
$images = [];

if (is_dir($imageDir)) {
    $files = scandir($imageDir);
    
    foreach ($files as $file) {
        $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
        if ($file !== '.' && $file !== '..' && in_array($extension, $allowedExtensions)) {
            $images[] = $file;
        }
    }
}

echo json_encode($images);
?>
