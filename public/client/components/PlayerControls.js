var PlayerControls = () => {

	//controls for music player
	//buttons need to inherit onClick
	return (

		<div class='player-controls'>
			<button className='volumeUp' onClick={}>Up</button>
			<button className='volumeDown' onClick={}>Down</button>
			<button className='play' onClick={}>Play</button>
			<button className='pause' onClick={}>Pause</button>
		</div>
	)
}