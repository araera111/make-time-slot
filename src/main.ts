import { range, take, takeLast } from 'rambda';

const conv = (HHmmNum: number): string => {
	const str = HHmmNum.toString().padStart(4, '0');
	const take2 = take(2, str);
	const takeLast2 = takeLast(2, str);
	return `${take2}:${takeLast2}`;
};

export const convertHHColonmm = (HHmmNums: number[]): string[] => HHmmNums.map((i) => conv(i));
export const calcNumTime = (HH: number, mm: number): number =>
	parseInt(HH.toString().padStart(2, '0') + mm.toString().padStart(2, '0'), 10);

const timeNumberToHHmmString = (time: number): string => time.toString().padStart(4, '0');
const getHHmmFromHHmmString = (HHmmString: string): { HH: number; mm: number } => ({
	HH: parseInt(take(2, HHmmString), 10),
	mm: parseInt(takeLast(2, HHmmString), 10)
});

export const getTakeMinutes = (num: number): number => parseInt(takeLast(2, num.toString()), 10);
export const getTakeHH = (num: number): number =>
	parseInt(take(2, num.toString().padStart(4, '0')), 10);

export const getNextNum = (currentNum: number, step: number) => {
	const mm = getTakeMinutes(currentNum);
	const HH = getTakeHH(currentNum);
	if (mm + step < 60) return currentNum + step;

	const nextmm = mm + step - 60;
	const nextHH = HH + 1;
	return calcNumTime(nextHH, nextmm);
};

export const makeTimeSlot = (
	beginTime: number,
	endTime: number,
	step: number,
	isLt = false
): number[] => {
	const beginHHmm = timeNumberToHHmmString(beginTime);
	const { HH: beginHH, mm: beginmm } = getHHmmFromHHmmString(beginHHmm);

	const endHHmm = timeNumberToHHmmString(endTime);
	const { HH: endHH, mm: endmm } = getHHmmFromHHmmString(endHHmm);

	const subHH = endHH - beginHH;

	const submm = endmm - beginmm;

	const sub = (subHH * 60 + submm) / step;

	const rangeMax = isLt ? sub : sub + 1;

	const times = range(0, rangeMax);

	let results: number[] = [];
	let num = beginTime;
	times.forEach((index) => {
		if (index === 0) {
			results = [num];
			return;
		}
		num = getNextNum(num, step);
		results = [...results, num];
	});
	return results;
};
