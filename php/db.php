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

		public static function allCountData($pdo){
			$sql = "SELECT COUNT(*) FROM goods";
			$result = $pdo->query($sql)->fetchColumn();

			return $result;
		}

		//create data
		public static function saveData($title, $description, $price, $pdo){
			
			$sql = "INSERT INTO goods ( title, description, price ) VALUES ( :title, :description, :price )";
			$result = $pdo->prepare($sql);
			
			$result->bindParam(':title', $title, PDO::PARAM_STR);
			$result->bindParam(':description', $description, PDO::PARAM_STR);
			$result->bindParam(':price', $price, PDO::PARAM_STR);
			
			return $result->execute();
		}
		//read all data, offset 5
		public static function selectAllData($start, $end, $pdo){
			
			$sql = 'SELECT id, title, description, price FROM goods LiMIT :start, :end';
			$result = $pdo->prepare($sql);

			$result->bindValue(':start', (int) $start, PDO::PARAM_INT);
			$result->bindValue(':end', (int) $end, PDO::PARAM_INT);
           
            $result->execute();
            
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $goods[] = $row;
            }
            
            return $goods;
		}
		//update data
		public static function updateData($id, $title, $description, $price, $pdo){
            
            $sql = 'UPDATE goods SET title = :title, description = :description, price = :price WHERE id = :id';
            $result = $pdo->prepare($sql);
            
            $result->bindParam(':id', $id, PDO::PARAM_INT);
            $result->bindParam(':title', $title, PDO::PARAM_STR);
            $result->bindParam(':description', $description, PDO::PARAM_STR);
            $result->bindParam(':price', $price, PDO::PARAM_STR);
            return $result->execute();
		}
		//delete data
		public static function deleteData($id, $pdo){
            
            $sql = 'DELETE FROM goods WHERE id = :id';
            $result = $pdo->prepare($sql);
            
            $result->bindParam(':id', $id, PDO::PARAM_INT);
            return $result->execute();
        }	
	}
?>