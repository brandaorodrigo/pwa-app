<?php

//$base_url = 'https://mfas02.maisfluxo.com.br/MaisFluxoServidorWEB/rest';
$base_url = 'https://mfweb.maisfluxo.com.br/MaisFluxoServidorWEB/rest';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if (!isset($_GET['endpoint'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing endpoint parameter']);
    exit;
}

$endpoint = filter_var($_GET['endpoint'], FILTER_SANITIZE_URL);
$server2_url = rtrim($base_url, '/') . '/' . ltrim($endpoint, '/');

$http_method = $_SERVER['REQUEST_METHOD'];

$data = file_get_contents('php://input');

$ch = curl_init($server2_url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
curl_setopt($ch, CURLOPT_TIMEOUT, 120);

switch ($http_method) {
    case 'POST':
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        break;
    case 'PUT':
    case 'PATCH':
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $http_method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        break;
    case 'DELETE':
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        break;
    case 'GET':
    default:
        break;
}

$headers = array(
    'Accept: application/json',
    'Content-Type: application/json',
);

if ('Authorization: ' . $_SERVER['HTTP_AUTHORIZATION']) {
    $headers[] = 'Authorization: ' . $_SERVER['HTTP_AUTHORIZATION'];
}

if ($_SERVER['HTTP_GOOGLETOKEN']) {
    $headers[] = 'GoogleToken: ' . $_SERVER['HTTP_GOOGLETOKEN'];
}

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
$error = curl_error($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error connecting to endpoint', 'details' => $error]);
} else {
    http_response_code($http_code);
    echo $response;
}

curl_close($ch);
