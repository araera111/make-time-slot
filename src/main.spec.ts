import { calcNumTime, getNextNum, getTakeHH, getTakeMinutes, makeTimeSlot } from './main';

describe('makeTimeSlot', () => {
	it('case1 10:00 10:30 30', () => {
		const beginTime = 1000;
		const endTime = 1130;
		const step = 30;
		const result = [1000, 1030, 1100, 1130];
		expect(makeTimeSlot(beginTime, endTime, step)).toStrictEqual(result);
	});

	it('case2 10:00 10:30 11:00 30', () => {
		const beginTime = 1000;
		const endTime = 1130;
		const step = 30;
		const result = [1000, 1030, 1100, 1130];
		expect(makeTimeSlot(beginTime, endTime, step)).toStrictEqual(result);
	});

	it('case3 100, 1000, 60', () => {
		const beginTime = 800;
		const endTime = 1000;
		const step = 60;
		const result = [800, 900, 1000];
		expect(makeTimeSlot(beginTime, endTime, step)).toStrictEqual(result);
	});

	it('case4 10:00 10:30 30', () => {
		const beginTime = 1000;
		const endTime = 1100;
		const step = 30;
		const result = [1000, 1030];
		expect(makeTimeSlot(beginTime, endTime, step, true)).toStrictEqual(result);
	});

	it('case５ 10:00 12:00 60', () => {
		const beginTime = 1000;
		const endTime = 1200;
		const step = 60;
		const result = [1000, 1100, 1200];
		expect(makeTimeSlot(beginTime, endTime, step, false)).toStrictEqual(result);
	});

	it('case6 10:45 12:00 15', () => {
		const beginTime = 1045;
		const endTime = 1200;
		const step = 15;
		const result = [1045, 1100, 1115, 1130, 1145, 1200];
		expect(makeTimeSlot(beginTime, endTime, step, false)).toStrictEqual(result);
	});

	it('case7 10:45 12:00 30', () => {
		const beginTime = 1045;
		const endTime = 1215;
		const step = 30;
		const result = [1045, 1115, 1145, 1215];
		expect(makeTimeSlot(beginTime, endTime, step, false)).toStrictEqual(result);
	});
});

describe('getTakeHH', () => {
	it('case1 1000', () => {
		const num = 1000;
		const result = 10;
		expect(getTakeHH(num)).toBe(result);
	});

	it('case2 700', () => {
		const num = 700;
		const result = 7;
		expect(getTakeHH(num)).toBe(result);
	});
});

describe('getTakeMinutes', () => {
	it('case1 1030', () => {
		const num = 1030;
		const result = 30;
		expect(getTakeMinutes(num)).toBe(result);
	});
});

describe('getNextNum', () => {
	it('case 1 1000 -> 30 -> 1030', () => {
		const before = 1000;
		const step = 30;
		const result = 1030;
		expect(getNextNum(before, step)).toBe(result);
	});

	it('case 2 1030 -> 30 -> 1100', () => {
		const before = 1030;
		const step = 30;
		const result = 1100;
		expect(getNextNum(before, step)).toBe(result);
	});

	it('case 3 1045 -> 30 -> 1115', () => {
		const before = 1045;
		const step = 30;
		const result = 1115;
		expect(getNextNum(before, step)).toBe(result);
	});
});

describe('calcNumTime', () => {
	it('case1 11+15 = 1115', () => {
		const HH = 11;
		const mm = 15;
		const result = 1115;
		expect(calcNumTime(HH, mm)).toBe(result);
	});
	it('case1 11+00 = 1100', () => {
		const HH = 11;
		const mm = 0;
		const result = 1100;
		expect(calcNumTime(HH, mm)).toBe(result);
	});
});
