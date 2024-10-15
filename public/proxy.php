<?php

$base_url = 'https://mfweb.maisfluxo.com.br/MaisFluxoServidorWEB/rest';
// $base_url = 'https://mfas02.maisfluxo.com.br/MaisFluxoServidorWEB/rest';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!isset($_GET['endpoint'])) {
    http_response_code(400);  // Bad Request
    echo json_encode(['error' => 'Missing endpoint parameter']);
    exit;
}

$endpoint = filter_var($_GET['endpoint'], FILTER_SANITIZE_URL);
$server2_url = rtrim($base_url, '/') . '/' . ltrim($endpoint, '/');

$data = json_decode(file_get_contents('php://input'), true);

$ch = curl_init($server2_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Accept: application/json',
    'Authorization: ' . $_SERVER['HTTP_AUTHORIZATION'],
    'Content-Type: application/json',
));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error connecting to endpoint']);
} else {
    http_response_code($http_code);
    echo $response;
}

curl_close($ch);
