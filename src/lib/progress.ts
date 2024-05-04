import config from '$lib/config';
const { video_length, date_start, date_end } = config;

const beginDate = new Date(...date_start);
const endDate = new Date(...date_end);
const beginTime = beginDate.getTime();
const endTime = endDate.getTime();

function progressToDate(progress: number) {
	const time = beginTime + progress * (endTime - beginTime);
	return new Date(time);
}

function dateToProgress(date: Date) {
	const time = date.getTime();
	return (time - beginTime) / (endTime - beginTime);
}

function getDurationFromProgress(input: AudienceInput) {
	const { progress_start, birthday } = input;
	const progress = dateToProgress(new Date(birthday));
	console.log(progress);

	const range =
		progress > progress_start ? progress - progress_start : progress + 1 - progress_start;

	return ~~(range * video_length) - 3;
}

export { progressToDate, dateToProgress, getDurationFromProgress };
