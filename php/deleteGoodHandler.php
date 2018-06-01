<?php

    include './db.php';

    $id = $_POST['id'];

    $pdo = Db::connect();
    $result = Db::deleteData($id, $pdo);
    
    echo json_encode($result);