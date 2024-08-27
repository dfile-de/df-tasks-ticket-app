<?php namespace ProcessWire;
// only for superuser
//$user=wire("user");
//if (!$user->isSuperuser()){
//	echo'<p>Zugriff verweigert!</p>';
//	exit();
//}

$segments = $input->urlSegments();
$action = '';
$id = '';

if(isset($segments[1])){
    $action = $segments[1];
}
if(isset($segments[2])){
    $id = $segments[2];
}
//set status to open
if($action=='open'){
	$page = $pages->get($id );
	if($page->id) {
	  $page->set('ticketstatus', 'open');
	  $page->of(false);
	  $page->save();
	  echo "Ticket status set to open for page ID {$id}";
	  }
}
//set status to in-progress
elseif($action=='inprogress'){
	$page = $pages->get($id );
	if($page->id) {
	  $page->set('ticketstatus', 'in-progress');
	  $page->of(false);
	  $page->save();
	  echo "Ticket status set to in-progress for page ID {$id}";
	  }
}
//set status to closed
elseif($action=='closed'){
	$page = $pages->get($id );
	if($page->id) {
	  $page->set('ticketstatus', 'closed');
	  $page->of(false);
	  $page->save();
	  echo "Ticket status set to closed for page ID {$id}";
	  }
}

else{
	echo '<p>Action: {$action} not allowed</p>';
	exit();
}