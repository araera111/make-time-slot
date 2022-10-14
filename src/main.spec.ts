import { makeTimeSlot } from './main';

describe('makeTimeSlot', () => {
	it('case1 10:00 10:30 30', () => {
		const beginTime = 1000;
		const endTime = 1100;
		const step = 30;
		const result = [1000, 1030, 1100];
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
});
