<?php

    include './db.php';

    $start = $_POST['start'];
    $end = $_POST['end'];

    
    $pdo = Db::connect();
    $allData = Db::selectAllData($start, $end, $pdo);
    
    echo json_encode($allData);
