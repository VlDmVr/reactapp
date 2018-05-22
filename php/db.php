<?php
	class Db{
		//подключение к базе данных
		public static function connect(){
			
			$host = 'localhost';
			$db = 'phptojs';
			$charset = 'utf8';
			$username = 'root';
			$passwd = '';
			$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
			$pdo = new PDO($dsn, $username, $passwd);
			return $pdo;
		}
		
		public static function saveData($title, $description, $price, $pdo){
			
			$sql = "INSERT INTO goods ( title, description, price ) VALUES ( :title, :description, :price )";
			$result = $pdo->prepare($sql);
			
			$result->bindParam(':title', $title, PDO::PARAM_STR);
			$result->bindParam(':description', $description, PDO::PARAM_STR);
			$result->bindParam(':price', $price, PDO::PARAM_INT);
			
			return $result->execute();
		}
		
		public static function selectAllData($pdo){
			
			$sql = 'SELECT id, title, description, price FROM goods';
            $result = $pdo->prepare($sql);
           
            $result->execute();
            
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $goods[] = $row;
            }
            
            return $goods;
		}
		
	}
?>