<?php

    include './db.php';

    $pdo = Db::connect();
    $allCount = Db::allCountData($pdo);
    
   echo $allCount;