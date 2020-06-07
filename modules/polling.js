const M = require('./common.js');
const axios = require('axios');
const kakao = require('../node-kakao');
const Kaling = require('./kaling.js');

const createRecommandLives = async () => {
	const livesRes = await axios.get('https://kr-api.spooncast.net/lives/discovered/');
	const lives = livesRes.data.results;

	const list = [];
	for ( live of lives ) {
		if ( live.title.includes("팅") === false ) {
			list.push({
				title: live.title,
				desc: `${live.author.nickname.trim()} | 👤 ${live.member_count} ❤ ${live.like_count}`,
				link: `https://www.spooncast.net/kr/live/${live.id}`,
				thumb: {
					url: live.img_url,
					style: kakao.CustomImageCropStyle.ORIGINAL,
				},
			});

			if ( list.length >= 5 ) {
				break;
			}
		}
	}
	const attachment = Kaling({
		type: kakao.CustomType.LIST,
		header: {
			title: `추천하는 방송`,
			link: 'https://www.spooncast.net/kr/',
			bg: 'https://www.spooncast.net/kr_share_default.png',
		},
		list,
	});
	return attachment;
};

global.poll = {
	sec:  0,
	min:  0,
	hour: 0,
	day:  0,
	__lc: {
		sec:  -1,
		min:  -1,
		hour: -1,
		day:  -1,
	},
	checker(type, num) {
		if ( this[type] !== this.__lc[type] ) {
			if ( this[type] % num === 0 ) {
				this.__lc[type] = this[type];
				return true;
			}
		}
		return false;
	},
};
global.interval = setInterval(async () => {

	global.poll.sec += 1;
	if ( global.poll.sec > 0 && global.poll.sec%60 === 0 ) {
		global.poll.min += parseInt(global.poll.sec / 60, 10);
		global.poll.sec = 1;
	}

	if ( global.poll.min > 0 && global.poll.min%60 === 0 ) {
		global.poll.hour += parseInt(global.poll.min / 60, 10);
		global.poll.min = 1;
	}

	if ( global.poll.hour > 0 && global.poll.hour%24 === 0 ) {
		global.poll.day += parseInt(global.poll.hour / 24, 10);
		global.poll.hour = 1;
	}

	const { sec, min, hour, day } = global.poll;

	if ( global.poll.checker('min', 1) ) {
		const crlTemplate = await createRecommandLives();
		M.sendToAllChannels(crlTemplate);
	}

}, 1000);
