class KeyInputPlugin{
	constructor(keymap){
		this.keymap = {
			"z": "prev-track",
			"x": "play-from-start",
			"c": "toggle-play",
			"v": "next-track",
			"arrowup": "volume:up",
			"arrowdown": "volume:down"
		};
	}

	getName(){
		return 'key-input';
	}

	connect(ctx, player){
		document.addEventListener('keydown', (ev) => {
			let keyString = '';

			if(ev.ctrlKey) keyString += 'ctrl-';
			if(ev.alt) keyString += 'alt-'
			if(ev.shiftKey) keyString += 'shift-';
			if(ev.metaKey) keyString += 'cmd-';

			keyString += ev.key.toLowerCase();

			const key = this.keymap[keyString];
			if(key){
				if(typeof key === 'string') player.execCommand(key);
				else if(typeof key === 'object' && key.commandName){
					player.execCommand(key.commandName, key.payload);
				}
			}
		});
	}
}

export default KeyInputPlugin;
