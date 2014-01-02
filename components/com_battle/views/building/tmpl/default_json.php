<?php

jimport( 'joomla.methods' ); 
if ($this->player->iduser == 0){
	$this->player->username = 'Nobody';
} 
//echo 'test:';
// print_r($this->board_info_1);
// exit();



$body ='<div id="building" class="clearfix"><!-- This should replace div#container -->
  <div class="building_left">
  
<div  class="compass">

<a href="index.php?option=com_battle&amp;view=single&amp;Itemid=115" class="mid"></a>

</div>
  
  
  
  
    <div id="info" class=" clearfix">
      <div class="name">'. $this->player->username  . ' owns ' . $this->buildings->name . '
        <span class="small">[Level 1]</span>
        <span class="red"><a href="#" title="Allocate stats points">-</a></span>
        <span class="small">
          <span class="highlight">3 Stats Pts</span>
          <span class="red"><a href="#" title="Allocate stats points">-</a></span>
        </span>
      </div>
      
      
      <div class="desc">
        <img src="components/com_battle/images/buildings/'.$this->buildings->image  . '"
		class="thumbnail" alt="' . $this->buildings->name . ' title="' . $this->buildings->name . '"
		width="100" height="100" id="building_image" />
        <p class="desc">' . $this->buildings->comment  . '</p>
      </div><!-- end desc -->

     
     
      <div class="stats">
        <table class="stats" id="stats" >
          <tr>
            <th scope="row">ID</th>
            <td>' . $this->buildings->id . '</td>
          </tr>
          <tr>
            <th scope="row">Protection</th>
            <td>' . $this->buildings->protection . '</td>
          </tr>
          <tr>
            <th scope="row">Energy</th>
            <td>' . $this->buildings->energy  . '</td>
          </tr>
          <tr>
            <th scope="row">Type</th>
            <td>' . $this->buildings->type  . '</td>
          </tr>
          <tr>
            <th scope="row">Owner</th>
            <td>' .$this->buildings->owner  . '</td>
          </tr>
          <tr>
            <th scope="row">XP</th>
            <td>' . $this->buildings->xp  . '</td>
          </tr>
          <tr>
            <th scope="row">Sale Price</th>
            <td>' . $this->buildings->price  . '</td>
          </tr>
          <tr>
            <th scope="row">Timer</th>
            <td>' . $this->buildings->timer . '</td>
          </tr>
        </table> 
      </div><!-- end stats -->
    </div><!-- end info -->
    <div class="extra clearfix">
      <div class="message_board">
        ' . $this->loadTemplate ("board_message") .  '
      </div>
    </div>
  </div><!--end building_left-->
  
  
  
  <div class="building_right">
    <div id="status">
      <div class="instructions">';

	
	if ($this->buildings->owner == 0){
      $body .= $this->loadTemplate ("board_info_poster");
	   }

	
	if ($this->buildings->owner != $this->user->id && $this->buildings->owner != 0 ){
       $body .= $this->loadTemplate ("board_info_poster");
	   }

	   
	//if player owned
	
	if ($this->buildings->owner == $this->user->id){
       $body .= $this->loadTemplate ("board_info1");
	   }
    $body .='  </div>
	
	
	
      <div id="action" class="clearfix">
      ';

//////////////////////////////   No Owner - Buy Only //////////////////////////////////
if ($this->buildings->owner == 0){
$body .=' <div class="buy" >
          <a href="#" class= "buy" id = "'. $this->buildings->id .'" >Buy this ' . $this->buildings->type .'</a>
        </div> <!--buy-->';
 
}
/////////////////////////////////////// Owned but not Player Owned //////////////////////////
if ($this->buildings->owner != $this->user->id && $this->buildings->owner != 0 ){
  $body .='      <div class= "attack" >
          <a href="#" class= "attack" id = "' . $this->buildings->id . '"> Attack this '. $this->buildings->type .'</a>
        </div><!-- attack-->
        ';

} 
///////////////////////////////////// Owned by Player  ////////////////////////// 
if ($this->buildings->owner == $this->user->id){
	// echo $this->loadTemplate ('board_info1'); 
	//  echo $this->loadTemplate ('board_crystals'); 
}
$body .='
      </div><!-- end action -->
    </div><!-- end status. Is this being used? I mean, really?? -->
  </div><!--end building_right-->
</div><!-- end building -->
';


if ($this->buildings->owner == $this->user->id || $this->buildings->public == 1 )
{
	$body .= $this->loadTemplate ($this->buildings->type);
}
elseif ($this->buildings->owner == 0 ||$this->buildings->owner == "")
{
	
	$body .= $this->loadTemplate ($this->buildings->type . "_not_owned");
}
elseif($this->buildings->owner != $this->user->id )
{
	
	$body .= $this->loadTemplate ($this->buildings->type . "_owned");
}


//$body = "hello";
echo json_encode($body);
?>


