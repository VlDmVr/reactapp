<?php

    include './db.php';

    $limit = $_POST['limit'];
    $offset = $_POST['offset'];

    
    $pdo = Db::connect();
    $allData = Db::selectAllData($limit, $offset, $pdo);
    
    echo json_encode($allData);
