let time = 0;
let value = 0;
export const videoLength = 387 as const;
// export const videoLength = 30 as const;

setInterval(() => {
	time = (time + 0.001) % videoLength;
	value = time / videoLength;
}, 1);

const beginDate = new Date(1960, 0, 1);
const endDate = new Date(2070, 11, 30);
const beginTime = beginDate.getTime();
const endTime = endDate.getTime();

function progressToDate(progress = value) {
	const time = beginDate.getTime() + progress * (endTime - beginTime);
	return new Date(time);
}

function dateToProgress(date: Date) {
	const time = date.getTime();
	console.log(time, beginTime, endTime);
	return (time - beginTime) / (endTime - beginTime);
}

function getDurationFromProgress(input: AudienceInput) {
	const { progress_start, birthday } = input;
	const progress = dateToProgress(new Date(birthday));
	console.log(progress);

	const range =
		progress > progress_start ? progress - progress_start : progress + 1 - progress_start;

	return range * videoLength;
}

export { value, progressToDate, dateToProgress, getDurationFromProgress };
