<?php
include 'db_connection.php';

$action = $_GET['action'];

if ($action == 'get') {
    $query = "SELECT * FROM messages ORDER BY timestamp DESC LIMIT 20";
    $result = $conn->query($query);
    $messages = array();
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
    echo json_encode(array_reverse($messages));
}

if ($action == 'send' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $message = $_POST['message'];
    $username = $_POST['username'];

    $stmt = $conn->prepare("INSERT INTO messages (username, message) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $message);
    $stmt->execute();
}
?>
