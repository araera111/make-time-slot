import { addMinutes, format } from 'date-fns';
import { drop, dropLast, take, takeLast } from 'rambda';

const conv = (HHmmNum: number): string => {
	const str = HHmmNum.toString().padStart(4, '0');
	const take2 = take(2, str);
	const takeLast2 = takeLast(2, str);
	return `${take2}:${takeLast2}`;
};

export const convertHHColonmm = (HHmmNums: number[]): string[] => HHmmNums.map((i) => conv(i));

export const makeTimeSlot = (
	beginTime: number,
	endTime: number,
	step: number,
	isLt = false
): number[] => {
	/* 初期値 */
	let results: number[] = [beginTime];

	/* 再起関数 */
	const makeTime = (beginTimeL: number, endTimeL: number, stepL: number): number[] => {
		/*
			入力された数字を時間と分に分割する。
			ex:1000 -> 10 と 0
			800のときにNanにならないようにpadStartで埋めてからtake2
			ex:800 -> 08と00だけど最終的には8と0
		*/
		const beginHH = parseInt(take(2, beginTimeL.toString().padStart(4, '0')), 10);
		const beginmm = parseInt(drop(2, beginTimeL.toString().padStart(4, '0')), 10);

		/* 1000が与えられたとき→1991年10時0分 1991年なのは生まれた年だから */
		const date = new Date(1991, 0, 1, beginHH, beginmm);

		/* stepを足した時刻を結果の配列に足していく */
		const next = parseInt(format(addMinutes(date, stepL), 'HHmm'), 10);
		results = [...results, next];

		/* 今回の結果がendTimeと一緒であれば終了 */
		if (next === endTimeL) return results;

		/* 一緒ではないときは再起 */
		return makeTime(next, endTimeL, stepL);
	};
	const master = makeTime(beginTime, endTime, step);
	return isLt ? dropLast(1, master) : master;
};
