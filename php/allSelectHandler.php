<?php

    include './db.php';

    $pdo = Db::connect();
    $allData = Db::selectAllData($pdo);
    
    echo json_encode($allData);