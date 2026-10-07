// درس سوم A0 و مبحث سوم گرامر برای هر سطح
const Q0={A0:[[['rice','برنج'],['egg','تخم‌مرغ'],['cup','فنجان'],['table','میز'],['chair','صندلی'],['door','در'],['hand','دست'],['eye','چشم'],['six','شش'],['seven','هفت']],
[['The cup is on the table.','فنجان روی میز است.'],['I have two hands.','من دو دست دارم.'],['The door is white.','در سفید است.']],
[['Is this your chair?','Yes, it is.','Yes, it are.','Yes, I chair.'],['What is this?','It is a cup.','It are a cup.','This is I cup.'],['How many eggs?','Six eggs.','Six egg is.','Eggs are I six.']]]};
L.forEach(l=>{const y=Q0[l.c];if(y){l.w.push(...y[0]);l.s.push(...y[1]);l.d.push(...y[2])}});
TT[0].push('خانه و اشیا');
const G3=[
['جمع بستن اسم‌ها','برای جمع بستن معمولاً s می‌گذاریم. بعضی کلمه‌ها بی‌قاعده‌اند.','noun + s (child → children)','two books / three boxes / one child, two children','✗ two book → ✓ two books'],
['Past Simple','برای کارهای تمام‌شده در گذشته.','verb + ed / irregular form','I watched TV. / She went home. / Did you eat?','✗ I goed → ✓ I went'],
['Relative clauses','برای توضیح دادن اسم با who، which و that.','noun + who/which/that + clause','The man who called is my boss. / The book that I read was long.','✗ The man which called → ✓ The man who called'],
['Modals of probability','برای حدس زدن با must، might و can\'t.','must / might / can\'t + base verb','He must be tired. / She might come. / That can\'t be true.','✗ He must is tired → ✓ He must be tired'],
['Causatives','وقتی کسی کاری را برای ما انجام می‌دهد.','have / get + object + past participle','I had my car repaired. / She got her hair cut.','✗ I repaired my car (at a garage) → ✓ I had my car repaired'],
['Mixed conditionals','شرط در گذشته با نتیجه در حال.','If + past perfect, would + base verb','If I had studied medicine, I would be a doctor now.','✗ If I studied medicine… → ✓ If I had studied medicine…'],
['Ellipsis و substitution','برای طبیعی‌تر شدن گفتار، بخش‌های تکراری را حذف یا جایگزین می‌کنیم.','so can I · neither does she · I think so','I can swim, and so can she. / He said he would, and he did.','✗ I can swim and she can swim too → ✓ …and so can she']];
