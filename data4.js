// A0: درس چهارم و پنجم
const Q1={A0:[[['green','سبز'],['yellow','زرد'],['Tuesday','سه‌شنبه'],['Friday','جمعه'],['January','ژانویه'],['summer','تابستان'],['Iran','ایران'],['Iranian','ایرانی'],['good morning','صبح بخیر'],['goodbye','خداحافظ'],
['eight','هشت'],['nine','نه'],['twelve','دوازده'],['twenty','بیست'],['Saturday','شنبه'],['Sunday','یکشنبه'],['March','مارس'],['winter','زمستان'],['pink','صورتی'],['orange','نارنجی']],
[['I am Iranian.','من ایرانی هستم.'],['Today is Friday.','امروز جمعه است.'],['The sky is blue.','آسمان آبی است.'],['I am twenty years old.','من بیست ساله‌ام.'],['Sunday is the first day.','یکشنبه روز اول است.'],['Winter is cold.','زمستان سرد است.']],
[['Where are you from?','I am from Iran.','I from Iran am.','I am Iranian from.'],['What day is it?','It is Friday.','It are Friday.','Friday I am.'],['Goodbye!','Goodbye! See you.','Goodbye, summer.','See I you goodbye.'],['How old are you?','I am twenty.','I have twenty.','I twenty years am.'],['What is your favorite color?','My favorite color is pink.','My favorite color are pink.','Pink color favorite my.'],['Is it winter?','Yes, it is.','Yes, it are.','Yes, winter am I.']]]};
L.forEach(l=>{const y=Q1[l.c];if(y){l.w.push(...y[0]);l.s.push(...y[1]);l.d.push(...y[2])}});
TT[0].push('رنگ‌ها، روزها و کشورها','اعداد و فصل‌ها');
