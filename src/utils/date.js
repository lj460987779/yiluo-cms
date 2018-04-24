export function dateToYMDHMS(date,reg){
	console.log(typeof(date))
	let	yy = date.getFullYear(),
	    mm = date.getMonth()+1,
	    dd = date.getDate(),
	    h = date.getHours(),
	    m = date.getMinutes(),
	    s = date.getSeconds();
	if(reg === "s"){
		return [yy, mm, dd].join('-')+ ' ' + [h, m, s].join(':')
	}else if(reg === "d"){
		return [yy, mm, dd].join('-')
	}
}