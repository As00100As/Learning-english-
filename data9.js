// سرفصل کامل دوره: ۷ سطح، ۶۲ واحد، ۶۶۰ درس
const CU_=(n,t,e=['Review','Test'])=>[n,[...t.split('|'),...e]];
const GEN=(names,c)=>names.map(n=>[n,Array.from({length:c},(_,k)=>'Lesson '+(k+1))]);
const CUR=[
['A0',[
CU_('First Steps','Alphabet|Letter Names|Basic Letter Sounds|Vowels & Consonants|Numbers 0–20|Colors|Classroom Objects|Basic Instructions'),
CU_('Meeting People','Hello & Goodbye|Introducing Yourself|My Name Is...|Countries|Nationalities|Personal Information|Basic Questions|Mini Conversations'),
CU_('People & Family','Family Members|He / She / They|This / That|Possessives|Describing People|Age|Jobs|Basic Adjectives'),
CU_('Everyday Things','Common Objects|Home|Rooms|Food|Drinks|Clothes|Places|Basic Prepositions'),
CU_('Basic Sentences','Verb "Be"|Affirmative Sentences|Negative Sentences|Yes/No Questions|WH Questions|Singular & Plural|Articles|Basic Sentence Order'),
CU_('Survival English','Asking for Help|Shopping|Restaurant|Directions|Transportation|Phone Conversations|Time & Dates|Emergency English',['Final Review','A0 Final Exam'])]],
['A1',[
CU_('Daily Life','Daily Routines|Present Simple|Do / Does|Time|Frequency Adverbs|Morning & Evening|Everyday Questions|Daily Conversation'),
CU_('People & Places','Describing People|Describing Places|There Is / There Are|Have / Has|Prepositions|My Home|My City|Giving Directions'),
CU_('Food & Shopping','Food Vocabulary|Countable Nouns|Uncountable Nouns|Some / Any|Much / Many|Shopping|Restaurants|Ordering Food'),
CU_('Present & Past','Present Continuous|Present Simple vs Continuous|Past Simple|Regular Verbs|Irregular Verbs|Yesterday|Weekend Activities|Telling a Story'),
CU_('Future','Future Plans|Going To|Will|Predictions|Invitations|Making Plans|Appointments|Future Conversations'),
CU_('Travel','Airport English|Hotels|Transportation|Asking Directions|Tickets|Travel Problems|Tourist Conversations|Travel Story'),
CU_('Communication','Can / Can\'t|Should|Must / Have To|Requests|Offers|Suggestions|Telephone English|Social Conversations'),
CU_('A1 Mastery','Grammar Review|Vocabulary Review|Listening Review|Reading Review|Speaking Review|Writing Review|Everyday Conversation|Common Mistakes',['Final Practice','A1 Final Exam'])]],
['A2',[
CU_('Experiences','Present Perfect|Ever / Never|Just / Already / Yet|For / Since|Life Experiences|Past vs Present Perfect|Personal Stories|Listening Practice'),
CU_('Past Stories','Past Continuous|Past Simple vs Continuous|Past Perfect|Sequencing Events|Storytelling|Describing Events|Unexpected Events|Listening Stories'),
CU_('Future & Plans','Future Forms|Present Continuous for Future|Will vs Going To|Future Plans|Predictions|Arrangements|Goals|Making Decisions'),
CU_('Conditionals','Zero Conditional|First Conditional|If / Unless|Real Situations|Advice|Possibilities|Problem Solving|Conversation Practice'),
CU_('Communication','Gerunds|Infinitives|Verb Patterns|Requests|Polite Language|Agreeing & Disagreeing|Giving Opinions|Conversations'),
CU_('Modern Life','Technology|Internet|Social Media|Work|Education|Health|Environment|News'),
CU_('Vocabulary Expansion','Phrasal Verbs|Common Idioms|Collocations|Synonyms|Antonyms|Word Formation|Describing Emotions|Natural English'),
CU_('A2 Mastery','Grammar Review|Vocabulary Review|Listening|Reading|Speaking|Writing|Conversation|Common Errors',['Final Practice','A2 Final Exam'])]],
['B1',GEN(['Advanced Tenses','Perfect Tenses','Conditionals','Passive Voice','Reported Speech','Relative Clauses','Modal Verbs','Phrasal Verbs & Idioms','Real-World English','B1 Mastery'],10)],
['B2',GEN(['Advanced Grammar','Complex Sentences','Advanced Conditionals','Passive & Causative','Advanced Modals','Academic Vocabulary','Professional English','Debates & Discussions','Advanced Reading & Listening','B2 Mastery'],10)],
['C1',GEN(['Advanced Grammar & Structures','Academic English','Professional English','Advanced Vocabulary','Idioms & Collocations','Nuance & Register','Advanced Listening','Advanced Speaking & Debate','Academic & Professional Writing','Critical Reading'],12)],
['C2',GEN(['Near-Native Vocabulary','Advanced Grammar','Nuance & Meaning','Idioms & Figurative English','Academic English','Professional English','Advanced Listening','Advanced Speaking','Advanced Writing','C2 Mastery'],12)]];
