<?php
// 这是个人修改版本，通过 ngnix 重定向，到此页面，再进行正确地址和数据的分配
// ngnix 配置： rewrite ^/(.+)\.html$ /index.php?page=$1 last;


ini_set('display_errors', 1);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

//引用静态资源管理类
require_once 'Resource.class.php';

//设置配置和模板文件夹
$root = dirname(__FILE__) . DIRECTORY_SEPARATOR;
FISResource::setConfig(array(
    'config_dir'    => $root . '/tpl/config/',
    'template_dir'  => $root . '/tpl/'
));

$data_root = "data/";
$page_root = "page/";

$page_name = $_GET["page"];
if (empty($page_name)) {
    $page_name = "index";
}

// 判断一下存放数据的文件是否存在，引入此文件
$data_url = $data_root . $page_name . ".php";
if (is_file($data_url)) {
    include $data_url;
}


//渲染首页
$page_url = $page_root . $page_name . ".php";
display($page_url, $fis_data);
// display("page/index.php", $fis_data);
