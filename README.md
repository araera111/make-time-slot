# make-time-slot

## 何をするライブラリなのか？

開始時刻と終了時刻、時間刻みを渡すと配列が返ってきます。

ex: 900, 1000, 30 -> 900, 930, 1000

ex2: 1000, 1100, 15 -> 1000, 1015, 1030, 1045, 1100

タイムスケジュール表をつくるときに便利なライブラリです。

## installation

```sh
npm i make-time-slot
or
yarn add make-time-slot
or
pnpm add make-time-slot
```

## usage(使い方)

開始時刻、終了時刻をnumberにします。
(例：10時00分であれば1000。8時15分であれば815など)
beginTime, endTime is number type.
example:10:00 -> 1000

刻みの分数をnumberにします。
(例：30分刻みであれば30)
step is number type;

```TypeScript
import { makeTimeSlot } from "make-time-slot";
const beginTime = 1000;
const endTime = 1100;
const step = 30;

const timeSlots:number[] = makeTimeSlot(beginTime, endTime, step);
// [1000, 1030, 1100]
```

もし1000を10:00に変更したいときは```convertHHColonmm```関数で変換を行います。

```TypeScript
const timeSlots:number[] = makeTimeSlot(900, 1000, 15);
//[900, 915, 930, 945, 1000]
const timeSlotsHHmm:string[] = convertHHColonmm(timeNum);
//['09:00', '09:15', '09:30', '09.45', '10:00']
```

もし最後の数字がいらない場合(未満で良い場合は最後にbooleanを渡せます。
isLtなのでLess than,未満かどうかのbooleanです。
trueを渡すと10時未満になるので10時の1個前で終わります。
まあstepの15を引いた945を渡せばいいのですが計算が面倒くさい人向け。

```TypeScript
const timeSlots:number[] = makeTimeSlot(900, 1000, 15, true);
//[900, 915, 930, 945]
```
