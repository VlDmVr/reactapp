<?php

    include './db.php';

    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    $pdo = Db::connect();
    $result = Db::saveData($title, $description, $price, $pdo);
    
    echo json_encode($result);