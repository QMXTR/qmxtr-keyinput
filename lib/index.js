const DEFAULT_KEYMAP = {
	"z": "prev-track",
	"x": "play-from-start",
	"c": "toggle-play",
	"v": "next-track",
	"arrowup": "volume:up",
	"arrowdown": "volume:down",
	"arrowright": {
		commandName: "skip",
		payload: 5
	},
	"arrowleft": {
		commandName: "skip",
		payload: -5
	},
	" ": "toggle-play"
};

class KeyInputPlugin {
	constructor(keymap){
		this.keymap = DEFAULT_KEYMAP;

		Object.keys(keymap).forEach((v) => {
			this.keymap[v] = keymap[v];
		});
	}

	getName(){
		return 'key-input';
	}

	connect(ctx, player){
		document.addEventListener('keydown', (ev) => {
			if(document.activeElement.tagName.toLowerCase() === 'input') return;

			let keyString = '';

			if(ev.ctrlKey) keyString += 'ctrl-';
			if(ev.alt) keyString += 'alt-'
			if(ev.shiftKey) keyString += 'shift-';
			if(ev.metaKey) keyString += 'cmd-';

			keyString += ev.key.toLowerCase();

			const key = this.keymap[keyString];
			if(key){
				if(typeof key === 'string') player.execCommand(key);
				else if(typeof key === 'object' && key.commandName) {
					player.execCommand(key.commandName, key.payload);
				} else {
					throw new Error("Failed to parse keymap: Unknown type!");
				}
			}
		});
	}
}

export default KeyInputPlugin;
