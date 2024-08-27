<?php namespace ProcessWire; 
$dataArray=[];
foreach($page->children() as $child) {
    $data = [
        'id' => $child->id,
        'title' => $child->title,
    ];
    $dataArray[] = $data;
}
echo json_encode($dataArray);
?>