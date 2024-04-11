let time = 0;
const maxTime = 6 * 60 * 1000;

let value = 0;
const originVideoLength = 27.375 * 1000;

setInterval(() => {
	time = (time + 1) % maxTime;
	value = time / maxTime;
}, 1);

const beginDate = new Date(1960, 0, 0);
const endDate = new Date(2070, 11, 31);

function progressToDate() {
	const time = beginDate.getTime() + value * (endDate.getTime() - beginDate.getTime());
	return new Date(time);
}

function dateToProgress(date: Date) {
	const time = date.getTime();
	const beginTime = beginDate.getTime();
	const endTime = endDate.getTime();
	return (time - beginTime) / (endTime - beginTime);
}

function getSpeedFromProgress(input: AudienceInput) {
	const { progress_start, birthday } = input;
	const progress = dateToProgress(new Date(birthday));

	return (progress - progress_start) / (originVideoLength - progress_start);
}

export { value, progressToDate, dateToProgress };
