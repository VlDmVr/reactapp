<?php

include './db.php';

$id = $_POST['id'];
$title = $_POST['title'];
$description = $_POST['description'];
$price = $_POST['price'];

$pdo = Db::connect();
$data = Db::updateData($id, $title, $description, $price, $pdo);

echo json_encode($data);