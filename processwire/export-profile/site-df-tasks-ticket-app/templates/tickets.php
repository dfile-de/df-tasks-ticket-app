<?php namespace ProcessWire; 
$dataArray=[];
foreach($page->children() as $child) {
    if($child->get('ticketstatus.title')!='closed'){
        $data = [
            'id' => $child->id,
            'date'=> $child->publishedStr,
            'status' => $child->get('ticketstatus.title'),
            'priority' => 'priority-'.$child->get('priority.title'),
            'title' => $child->title,
            'aufgabe' => $child->get('t_aufgabe'),
            'zugewiesen' => $child->get('mitarbeiter.title'),
       ];
        $dataArray[] = $data;
    };
}
echo json_encode($dataArray);
?>