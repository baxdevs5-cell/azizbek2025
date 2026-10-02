import { Lesson, LessonSection, VocabularyItem, Exercise, Test, TestQuestion } from '@/shared/types/index.ts';

export const initialLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Personal Information',
    description: 'O‘zingiz haqida ma’lumot berish, ism, yosh va mamlakat haqida gapirish.',
    order_index: 1,
    difficulty: 'Easy',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-2',
    title: 'Family and Friends',
    description: 'Oila a’zolari va yaqin do‘stlar haqida so‘zlashish, have got / has got.',
    order_index: 2,
    difficulty: 'Easy',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-3',
    title: 'Daily Routines',
    description: 'Kun tartibi, ertalabdan kechgacha bo‘lgan faoliyatlar va vaqtni aytish.',
    order_index: 3,
    difficulty: 'Easy',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-4',
    title: 'Present Simple',
    description: 'Hozirgi oddiy zamon qoidalari, doimiy odatlar va uchinchi shaxs qoidasi (-s/-es).',
    order_index: 4,
    difficulty: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-5',
    title: 'Present Continuous',
    description: 'Ayni damda sodir bo‘layotgan harakatlar, to be + verb-ing tuzilishi.',
    order_index: 5,
    difficulty: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-6',
    title: 'Food and Drinks',
    description: 'Yeguliklar va ichimliklar, sanaladigan va sanalmaydigan otlar (some / any).',
    order_index: 6,
    difficulty: 'Easy',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-7',
    title: 'Hobbies and Free Time',
    description: 'Qiziqishlar, bo‘sh vaqt mashg‘ulotlari, sport va can / can\'t modal fe’li.',
    order_index: 7,
    difficulty: 'Easy',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-8',
    title: 'School Life and Subjects',
    description: 'Maktab fanlari, sinfxona jihozlari va maktab qoidalari.',
    order_index: 8,
    difficulty: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-9',
    title: 'My Home and Rooms',
    description: 'Uy xonalari, mebellar va "There is / There are" birikmalari.',
    order_index: 9,
    difficulty: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-10',
    title: 'Weather and Seasons',
    description: 'Ob-havo, fasllar va kiyim-kechaklar haqida gapirish.',
    order_index: 10,
    difficulty: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-11',
    title: 'Travel and Transport',
    description: 'Sayohat qilish, transport vositalari va o‘rin-joy predloglari.',
    order_index: 11,
    difficulty: 'Hard',
    created_at: new Date().toISOString()
  },
  {
    id: 'lesson-12',
    title: 'Past Events (Past Simple)',
    description: 'O‘tgan zamon, to be (was/were) va to‘g‘ri fe’llar (-ed qo‘shimchasi).',
    order_index: 12,
    difficulty: 'Hard',
    created_at: new Date().toISOString()
  }
];

export const initialSections: LessonSection[] = [
  // Lesson 1: Personal Info
  {
    id: 'sec-1-1',
    lesson_id: 'lesson-1',
    title: 'Grammar: To be (am / is / are)',
    content: `Ingliz tilida shaxs haqida ma'lumot berishda "to be" fe'lidan foydalaniladi:
- I am (Men ...) -> I am Anvar. I am 12 years old.
- He / She / It is -> She is from Tashkent. He is a student.
- We / You / They are -> We are in the 6th grade. They are friendly.

Inkor shakli (Negative):
- I am not a teacher.
- He is not (isn't) from Samarkand.

Savol shakli (Question):
- Are you 12 years old? - Yes, I am. / No, I'm not.
- Is she your classmate? - Yes, she is.`,
    order_index: 1
  },
  {
    id: 'sec-1-2',
    lesson_id: 'lesson-1',
    title: 'Examples and Dialogues',
    content: `A: Hello! What is your name?
B: Hi! My name is Malika.
A: How old are you?
B: I am 11 years old and I study in the 6th grade.
A: Where are you from?
B: I am from Uzbekistan, Bukhara. Nice to meet you!
A: Nice to meet you too!`,
    order_index: 2
  },

  // Lesson 2: Family and Friends
  {
    id: 'sec-2-1',
    lesson_id: 'lesson-2',
    title: 'Grammar: Have got / Has got',
    content: `"Have got / Has got" - "egalik qilmoq / bor bo'lmoq" ma'nosini bildiradi.

Darak shakli (Positive):
- I / You / We / They + have got (I've got a brother).
- He / She / It + has got (She's got a big family).

Inkor shakli (Negative):
- haven't got / hasn't got (We haven't got a pet).

Savol shakli (Question):
- Have you got any sisters? - Yes, I have. / No, I haven't.
- Has he got a dog? - Yes, he has.`,
    order_index: 1
  },

  // Lesson 3: Daily Routines
  {
    id: 'sec-3-1',
    lesson_id: 'lesson-3',
    title: 'Daily Actions & Telling Time',
    content: `Kun tartibi iboralari:
- wake up (uyg'onmoq)
- brush teeth (tish yuvmoq)
- have breakfast (nonushta qilmoq)
- go to school (maktabga bormoq)
- do homework (uy vazifasi bajarmoq)
- go to bed (uxlashga yotmoq)

Vaqtni aytish (Telling the time):
- It's 7 o'clock. (Soat yetti).
- It's half past seven. (Yetti yarim).
- It's quarter past eight. (Sakkizdan 15 daqiqa o'tdi).`,
    order_index: 1
  },

  // Lesson 4: Present Simple
  {
    id: 'sec-4-1',
    lesson_id: 'lesson-4',
    title: 'Grammar: Present Simple (Hozirgi oddiy zamon)',
    content: `Present Simple doimiy takrorlanadigan odatlar, haqiqatlar va kun tartibi uchun ishlatiladi.

1. Positive (Darak):
- I / You / We / They + Verb (I play football. You play football.)
- He / She / It + Verb + (s/es) (He plays football. She watches TV.)

2. Negative (Inkor):
- I / You / We / They + don't + Verb (I don't play tennis.)
- He / She / It + doesn't + Verb (He doesn't play tennis.)

3. Question (Savol):
- Do you play football? - Yes, I do. / No, I don't.
- Does he play football? - Yes, he does. / No, he doesn't.

Qoidalar: Fe'l -ch, -sh, -ss, -x, -o bilan tugasa: watches, washes, goes, mixes qo'shiladi.`,
    order_index: 1
  },

  // Lesson 5: Present Continuous
  {
    id: 'sec-5-1',
    lesson_id: 'lesson-5',
    title: 'Grammar: Present Continuous (Hozirgi davomli zamon)',
    content: `Ayni paytda (hozir) bo'layotgan ish-harakatlar uchun ishlatiladi.

Formula: Subject + am/is/are + Verb-ing

1. Positive:
- I am reading a book now.
- He is doing his homework at the moment.
- They are playing in the school yard.

2. Negative:
- I am not sleeping.
- She isn't watching TV.
- We aren't making noise.

3. Question:
- Are you listening to music? - Yes, I am.
- Is she writing a letter? - No, she isn't.

Signal so'zlar: now, at the moment, right now, Look!, Listen!`,
    order_index: 1
  },

  // Lesson 6: Food and Drinks
  {
    id: 'sec-6-1',
    lesson_id: 'lesson-6',
    title: 'Grammar: Countable & Uncountable Nouns, Some / Any',
    content: `Sanaladigan otlar (Countable): apple, banana, egg, sandwich (an apple, two apples).
Sanalmaydigan otlar (Uncountable): water, milk, rice, bread, cheese, sugar.

Some va Any:
- Some: Darak gaplarda (I have some apples. I want some water.)
- Any: Inkor va savol gaplarda (There isn't any milk. Do you have any bread?)`,
    order_index: 1
  },

  // Lesson 7: Hobbies
  {
    id: 'sec-7-1',
    lesson_id: 'lesson-7',
    title: 'Grammar: Can / Can\'t (Qobiliyat va imkoniyat)',
    content: `Can fe'li qobiliyatni ("qo'lidan kelmoq / qila olmoq") ifodalaydi.
- I can swim very fast.
- She can play the piano.
- They can't (cannot) speak German.
- Can you ride a bicycle? - Yes, I can. / No, I can't.`,
    order_index: 1
  },

  // Lesson 8: School Life
  {
    id: 'sec-8-1',
    lesson_id: 'lesson-8',
    title: 'School Subjects & Prepositions of Time (at, in, on)',
    content: `Maktab fanlari: Mathematics (Maths), English, History, Science, Art, PE (Physical Education), Music, Geography.

Vaqt predloglari:
- AT: soat vaqtlarida (at 8:00, at noon, at night)
- ON: kunlar va sanalarda (on Monday, on Friday morning, on May 9th)
- IN: oylar, yillar va kun qismlarida (in September, in 2026, in the morning)`,
    order_index: 1
  },

  // Lesson 9: My Home
  {
    id: 'sec-9-1',
    lesson_id: 'lesson-9',
    title: 'Grammar: There is / There are',
    content: `Biror joyda biror narsa borligini aytish:
- There is + birlik ot: There is a sofa in the living room.
- There are + ko'plik ot: There are three chairs in the kitchen.

Inkor:
- There isn't a TV in my bedroom.
- There aren't any books on the desk.

Savol:
- Is there a mirror in the hall? - Yes, there is.
- Are there two windows? - No, there aren't.`,
    order_index: 1
  },

  // Lesson 10: Weather
  {
    id: 'sec-10-1',
    lesson_id: 'lesson-10',
    title: 'Weather & Comparative Adjectives',
    content: `Ob-havo: sunny (quyoshli), rainy (yomg'irli), snowy (qorli), windy (shamolli), cloudy (bulutli), hot (issiq), cold (sovuq).

Sifat darajalari (Comparatives - Qiyosiy daraja):
- Qisqa sifatlar + er + than:
  cold -> colder than (Summer is hotter than spring).
  fast -> faster than
- Uzun sifatlar: more + sifat + than:
  beautiful -> more beautiful than
  comfortable -> more comfortable than`,
    order_index: 1
  },

  // Lesson 11: Travel
  {
    id: 'sec-11-1',
    lesson_id: 'lesson-11',
    title: 'Transport & Prepositions of Movement',
    content: `Transport turlari bilan "by" predlogi:
- by bus, by train, by car, by plane (lekin: on foot - piyoda).

Harakat predloglari:
- to: I go to Samarkand by train.
- through: The train goes through the tunnel.
- across: We walked across the bridge.`,
    order_index: 1
  },

  // Lesson 12: Past Events
  {
    id: 'sec-12-1',
    lesson_id: 'lesson-12',
    title: 'Grammar: Past Simple (Was / Were & Regular Verbs)',
    content: `O'tgan zamon (Past Simple) o'tmishda yakunlangan harakatlar uchun ishlatiladi.

1. To be o'tgan zamonda:
- I / He / She / It WAS (I was at home yesterday).
- We / You / They WERE (They were in the park).

2. To'g'ri fe'llar (Regular verbs) + ed:
- play -> played (We played football on Sunday).
- visit -> visited (She visited her grandmother).
- watch -> watched (I watched a cartoon).

Signal so'zlar: yesterday, last week, two days ago, in 2025.`,
    order_index: 1
  }
];

export const initialVocabulary: VocabularyItem[] = [
  // Lesson 1
  {
    id: 'voc-1',
    lesson_id: 'lesson-1',
    word: 'age',
    translation: 'yosh',
    example: 'What is your age? I am twelve.',
    category: 'Personal Info',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-2',
    lesson_id: 'lesson-1',
    word: 'country',
    translation: 'mamlakat, davlat',
    example: 'Uzbekistan is a beautiful country.',
    category: 'Personal Info',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-3',
    lesson_id: 'lesson-1',
    word: 'classmate',
    translation: 'sinfdosh',
    example: 'Jasur is my best classmate.',
    category: 'School',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-4',
    lesson_id: 'lesson-1',
    word: 'surname',
    translation: 'familiya',
    example: 'My surname is Alimov.',
    category: 'Personal Info',
    created_at: new Date().toISOString()
  },

  // Lesson 2
  {
    id: 'voc-5',
    lesson_id: 'lesson-2',
    word: 'parents',
    translation: 'ota-ona',
    example: 'My parents are teachers.',
    category: 'Family',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-6',
    lesson_id: 'lesson-2',
    word: 'cousin',
    translation: 'amakivachcha / tog‘avachcha / xolavachcha',
    example: 'My cousin lives in Samarkand.',
    category: 'Family',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-7',
    lesson_id: 'lesson-2',
    word: 'friendly',
    translation: 'do‘stona, samimiy',
    example: 'Our neighbors are very friendly.',
    category: 'Family',
    created_at: new Date().toISOString()
  },

  // Lesson 3
  {
    id: 'voc-8',
    lesson_id: 'lesson-3',
    word: 'wake up',
    translation: 'uyg‘onmoq',
    example: 'I wake up at seven o\'clock every day.',
    category: 'Daily Life',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-9',
    lesson_id: 'lesson-3',
    word: 'breakfast',
    translation: 'nonushta',
    example: 'I have porridge and tea for breakfast.',
    category: 'Food',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-10',
    lesson_id: 'lesson-3',
    word: 'routine',
    translation: 'kun tartibi',
    example: 'My morning routine starts at 6:30.',
    category: 'Daily Life',
    created_at: new Date().toISOString()
  },

  // Lesson 4
  {
    id: 'voc-11',
    lesson_id: 'lesson-4',
    word: 'habit',
    translation: 'odat',
    example: 'Reading books is a great habit.',
    category: 'Daily Life',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-12',
    lesson_id: 'lesson-4',
    word: 'always',
    translation: 'doimo, har doim',
    example: 'She always helps her mother in the kitchen.',
    category: 'Daily Life',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-13',
    lesson_id: 'lesson-4',
    word: 'usually',
    translation: 'odatda',
    example: 'We usually play football on Saturdays.',
    category: 'Hobbies',
    created_at: new Date().toISOString()
  },

  // Lesson 5
  {
    id: 'voc-14',
    lesson_id: 'lesson-5',
    word: 'moment',
    translation: 'lahza, on',
    example: 'He is writing a message at the moment.',
    category: 'School',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-15',
    lesson_id: 'lesson-5',
    word: 'listen',
    translation: 'tinglamoq, quloq solmoq',
    example: 'Listen! The teacher is speaking.',
    category: 'School',
    created_at: new Date().toISOString()
  },

  // Lesson 6
  {
    id: 'voc-16',
    lesson_id: 'lesson-6',
    word: 'delicious',
    translation: 'mazali',
    example: 'This Uzbek plov is very delicious.',
    category: 'Food',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-17',
    lesson_id: 'lesson-6',
    word: 'vegetable',
    translation: 'sabzavot',
    example: 'Carrots and cucumbers are healthy vegetables.',
    category: 'Food',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-18',
    lesson_id: 'lesson-6',
    word: 'fruit',
    translation: 'meva',
    example: 'Apples and pomegranates are my favorite fruits.',
    category: 'Food',
    created_at: new Date().toISOString()
  },

  // Lesson 7
  {
    id: 'voc-19',
    lesson_id: 'lesson-7',
    word: 'hobby',
    translation: 'sevimli mashg‘ulot',
    example: 'Drawing pictures is my favorite hobby.',
    category: 'Hobbies',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-20',
    lesson_id: 'lesson-7',
    word: 'chess',
    translation: 'shaxmat',
    example: 'Can you play chess? Yes, I can.',
    category: 'Hobbies',
    created_at: new Date().toISOString()
  },

  // Lesson 8
  {
    id: 'voc-21',
    lesson_id: 'lesson-8',
    word: 'subject',
    translation: 'maktab fani',
    example: 'My favorite school subject is English.',
    category: 'School',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-22',
    lesson_id: 'lesson-8',
    word: 'timetable',
    translation: 'dars jadvali',
    example: 'We have six lessons on the timetable today.',
    category: 'School',
    created_at: new Date().toISOString()
  },

  // Lesson 9
  {
    id: 'voc-23',
    lesson_id: 'lesson-9',
    word: 'living room',
    translation: 'mehmonxona',
    example: 'There is a comfortable sofa in the living room.',
    category: 'Home',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-24',
    lesson_id: 'lesson-9',
    word: 'furniture',
    translation: 'mebel',
    example: 'We bought new wooden furniture for the room.',
    category: 'Home',
    created_at: new Date().toISOString()
  },

  // Lesson 10
  {
    id: 'voc-25',
    lesson_id: 'lesson-10',
    word: 'weather',
    translation: 'ob-havo',
    example: 'The weather is warm and sunny today.',
    category: 'Weather',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-26',
    lesson_id: 'lesson-10',
    word: 'autumn',
    translation: 'kuz fasli',
    example: 'Leaves turn yellow and fall in autumn.',
    category: 'Weather',
    created_at: new Date().toISOString()
  },

  // Lesson 11
  {
    id: 'voc-27',
    lesson_id: 'lesson-11',
    word: 'journey',
    translation: 'sayohat, safar',
    example: 'We had a safe journey to Bukhara.',
    category: 'Travel',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-28',
    lesson_id: 'lesson-11',
    word: 'airplane',
    translation: 'samolyot',
    example: 'Traveling by airplane is very fast.',
    category: 'Travel',
    created_at: new Date().toISOString()
  },

  // Lesson 12
  {
    id: 'voc-29',
    lesson_id: 'lesson-12',
    word: 'yesterday',
    translation: 'kecha',
    example: 'I was at the library yesterday afternoon.',
    category: 'Daily Life',
    created_at: new Date().toISOString()
  },
  {
    id: 'voc-30',
    lesson_id: 'lesson-12',
    word: 'celebrate',
    translation: 'nishonlamoq',
    example: 'We celebrated Navruz holiday last month.',
    category: 'Family',
    created_at: new Date().toISOString()
  }
];

export const initialExercises: Exercise[] = [
  // Lesson 1 exercises
  {
    id: 'ex-1',
    lesson_id: 'lesson-1',
    question: 'Choose the correct form: "I ___ a student in the 6th grade."',
    type: 'multiple_choice',
    explanation: '"I" olmoshidan keyin to be fe\'lining "am" shakli ishlatiladi.',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-1-1', exercise_id: 'ex-1', option_key: 'A', option_text: 'is', is_correct: false },
      { id: 'opt-1-2', exercise_id: 'ex-1', option_key: 'B', option_text: 'am', is_correct: true },
      { id: 'opt-1-3', exercise_id: 'ex-1', option_key: 'C', option_text: 'are', is_correct: false },
      { id: 'opt-1-4', exercise_id: 'ex-1', option_key: 'D', option_text: 'be', is_correct: false }
    ]
  },
  {
    id: 'ex-2',
    lesson_id: 'lesson-1',
    question: 'True or False: "She are from Uzbekistan" is grammatically correct.',
    type: 'true_false',
    explanation: '"She" birlik shaxs bo\'lgani uchun "is" ishlatilishi kerak: "She is from Uzbekistan".',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-2-1', exercise_id: 'ex-2', option_key: 'A', option_text: 'True', is_correct: false },
      { id: 'opt-2-2', exercise_id: 'ex-2', option_key: 'B', option_text: 'False', is_correct: true }
    ]
  },

  // Lesson 2 exercises
  {
    id: 'ex-3',
    lesson_id: 'lesson-2',
    question: 'He ___ two sisters and one brother.',
    type: 'multiple_choice',
    explanation: 'Uchinchi shaxs birlikda (he/she/it) "has got" ishlatiladi.',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-3-1', exercise_id: 'ex-3', option_key: 'A', option_text: 'have got', is_correct: false },
      { id: 'opt-3-2', exercise_id: 'ex-3', option_key: 'B', option_text: 'has got', is_correct: true },
      { id: 'opt-3-3', exercise_id: 'ex-3', option_key: 'C', option_text: 'having got', is_correct: false },
      { id: 'opt-3-4', exercise_id: 'ex-3', option_key: 'D', option_text: 'got', is_correct: false }
    ]
  },

  // Lesson 4 exercises (Present Simple)
  {
    id: 'ex-4',
    lesson_id: 'lesson-4',
    question: 'He ___ to school every day by bus.',
    type: 'multiple_choice',
    explanation: '"He" uchinchi shaxs birlik bo‘lgani uchun Present Simple’da "go" fe’liga "-es" qo‘shilib "goes" bo‘ladi.',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-4-1', exercise_id: 'ex-4', option_key: 'A', option_text: 'go', is_correct: false },
      { id: 'opt-4-2', exercise_id: 'ex-4', option_key: 'B', option_text: 'goes', is_correct: true },
      { id: 'opt-4-3', exercise_id: 'ex-4', option_key: 'C', option_text: 'going', is_correct: false },
      { id: 'opt-4-4', exercise_id: 'ex-4', option_key: 'D', option_text: 'gone', is_correct: false }
    ]
  },
  {
    id: 'ex-5',
    lesson_id: 'lesson-4',
    question: '___ you speak English fluently?',
    type: 'multiple_choice',
    explanation: 'Present Simple so‘roq gaplarida "you" olmoshi uchun "Do" yordamchi fe’li ishlatiladi.',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-5-1', exercise_id: 'ex-5', option_key: 'A', option_text: 'Does', is_correct: false },
      { id: 'opt-5-2', exercise_id: 'ex-5', option_key: 'B', option_text: 'Do', is_correct: true },
      { id: 'opt-5-3', exercise_id: 'ex-5', option_key: 'C', option_text: 'Are', is_correct: false },
      { id: 'opt-5-4', exercise_id: 'ex-5', option_key: 'D', option_text: 'Is', is_correct: false }
    ]
  },

  // Lesson 5 exercises (Present Continuous)
  {
    id: 'ex-6',
    lesson_id: 'lesson-5',
    question: 'Look! The boys ___ football in the garden right now.',
    type: 'multiple_choice',
    explanation: '"Look!" va "right now" davomli zamon signali bo‘lib, ko‘plikdagi the boys uchun "are playing" to‘g‘ri.',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-6-1', exercise_id: 'ex-6', option_key: 'A', option_text: 'plays', is_correct: false },
      { id: 'opt-6-2', exercise_id: 'ex-6', option_key: 'B', option_text: 'is playing', is_correct: false },
      { id: 'opt-6-3', exercise_id: 'ex-6', option_key: 'C', option_text: 'are playing', is_correct: true },
      { id: 'opt-6-4', exercise_id: 'ex-6', option_key: 'D', option_text: 'played', is_correct: false }
    ]
  },

  // Lesson 6 exercises (Food)
  {
    id: 'ex-7',
    lesson_id: 'lesson-6',
    question: 'There isn\'t ___ milk in the fridge.',
    type: 'multiple_choice',
    explanation: 'Inkor gaplarda sanalmaydigan va ko‘plikdagi otlar bilan "any" ishlatiladi.',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-7-1', exercise_id: 'ex-7', option_key: 'A', option_text: 'some', is_correct: false },
      { id: 'opt-7-2', exercise_id: 'ex-7', option_key: 'B', option_text: 'any', is_correct: true },
      { id: 'opt-7-3', exercise_id: 'ex-7', option_key: 'C', option_text: 'a', is_correct: false },
      { id: 'opt-7-4', exercise_id: 'ex-7', option_key: 'D', option_text: 'an', is_correct: false }
    ]
  },

  // Lesson 9 exercises (Home)
  {
    id: 'ex-8',
    lesson_id: 'lesson-9',
    question: 'There ___ four chairs around the dining table.',
    type: 'multiple_choice',
    explanation: 'Ko‘plikdagi otlar (four chairs) uchun "There are" ishlatiladi.',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-8-1', exercise_id: 'ex-8', option_key: 'A', option_text: 'is', is_correct: false },
      { id: 'opt-8-2', exercise_id: 'ex-8', option_key: 'B', option_text: 'are', is_correct: true },
      { id: 'opt-8-3', exercise_id: 'ex-8', option_key: 'C', option_text: 'have', is_correct: false },
      { id: 'opt-8-4', exercise_id: 'ex-8', option_key: 'D', option_text: 'has', is_correct: false }
    ]
  },

  // Lesson 10 exercises (Weather)
  {
    id: 'ex-9',
    lesson_id: 'lesson-10',
    question: 'Summer is ___ than winter.',
    type: 'multiple_choice',
    explanation: 'Qisqa sifat "hot" qiyosiy darajada oxirgi undoshi ikkilanib "hotter than" bo‘ladi.',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-9-1', exercise_id: 'ex-9', option_key: 'A', option_text: 'hot', is_correct: false },
      { id: 'opt-9-2', exercise_id: 'ex-9', option_key: 'B', option_text: 'hotter', is_correct: true },
      { id: 'opt-9-3', exercise_id: 'ex-9', option_key: 'C', option_text: 'more hot', is_correct: false },
      { id: 'opt-9-4', exercise_id: 'ex-9', option_key: 'D', option_text: 'hottest', is_correct: false }
    ]
  },

  // Lesson 12 exercises (Past Simple)
  {
    id: 'ex-10',
    lesson_id: 'lesson-12',
    question: 'We ___ our grandparents in Bukhara last weekend.',
    type: 'multiple_choice',
    explanation: '"last weekend" o‘tgan zamon bo‘lgani sababli to‘g‘ri fe’l "visit"ga "-ed" qo‘shiladi: "visited".',
    created_at: new Date().toISOString(),
    options: [
      { id: 'opt-10-1', exercise_id: 'ex-10', option_key: 'A', option_text: 'visit', is_correct: false },
      { id: 'opt-10-2', exercise_id: 'ex-10', option_key: 'B', option_text: 'visited', is_correct: true },
      { id: 'opt-10-3', exercise_id: 'ex-10', option_key: 'C', option_text: 'visiting', is_correct: false },
      { id: 'opt-10-4', exercise_id: 'ex-10', option_key: 'D', option_text: 'visits', is_correct: false }
    ]
  }
];

export const initialTests: Test[] = [
  {
    id: 'test-1',
    title: 'Unit 1-3 Review: Personal Info & Daily Life',
    description: '1-3 darslar bo‘yicha to be, have got, kun tartibi va soat vaqtlari bo‘yicha sinov testi.',
    duration_minutes: 15,
    difficulty: 'Easy',
    created_at: new Date().toISOString()
  },
  {
    id: 'test-2',
    title: 'Grammar Master: Present Simple vs Continuous',
    description: 'Hozirgi oddiy va hozirgi davomli zamonlar, ularning farqi va qo‘llanilishi.',
    duration_minutes: 20,
    difficulty: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'test-3',
    title: 'Food, Home & School Essentials',
    description: 'Some/any, there is/are, sanaladigan va sanalmaydigan otlar, maktab fanlari.',
    duration_minutes: 20,
    difficulty: 'Medium',
    created_at: new Date().toISOString()
  },
  {
    id: 'test-4',
    title: 'Past Simple & Travel Adventures',
    description: 'O‘tgan zamon was/were, to‘g‘ri fe’llar va transport turlari bo‘yicha test.',
    duration_minutes: 20,
    difficulty: 'Hard',
    created_at: new Date().toISOString()
  },
  {
    id: 'test-5',
    title: 'Final Exam: English 6-sinf Comprehensive Test',
    description: 'Butun 6-sinf darslik mavzulari bo‘yicha yakuniy kompleks sinov imtihoni.',
    duration_minutes: 25,
    difficulty: 'Hard',
    created_at: new Date().toISOString()
  }
];

export const initialTestQuestions: Record<string, TestQuestion[]> = {
  'test-1': [
    {
      id: 't1-q1',
      test_id: 'test-1',
      question: 'Where ___ you from? - I am from Tashkent.',
      order_index: 1,
      explanation: '"You" olmoshi bilan "are" to be shakli keladi.',
      options: [
        { id: 't1-q1-a', question_id: 't1-q1', option_key: 'A', option_text: 'is', is_correct: false },
        { id: 't1-q1-b', question_id: 't1-q1', option_key: 'B', option_text: 'are', is_correct: true },
        { id: 't1-q1-c', question_id: 't1-q1', option_key: 'C', option_text: 'am', is_correct: false },
        { id: 't1-q1-d', question_id: 't1-q1', option_key: 'D', option_text: 'be', is_correct: false }
      ]
    },
    {
      id: 't1-q2',
      test_id: 'test-1',
      question: 'She ___ got two cats and a puppy.',
      order_index: 2,
      explanation: 'Uchinchi shaxs birlikda "has got" ishlatiladi.',
      options: [
        { id: 't1-q2-a', question_id: 't1-q2', option_key: 'A', option_text: 'have', is_correct: false },
        { id: 't1-q2-b', question_id: 't1-q2', option_key: 'B', option_text: 'has', is_correct: true },
        { id: 't1-q2-c', question_id: 't1-q2', option_key: 'C', option_text: 'is', is_correct: false },
        { id: 't1-q2-d', question_id: 't1-q2', option_key: 'D', option_text: 'having', is_correct: false }
      ]
    },
    {
      id: 't1-q3',
      test_id: 'test-1',
      question: 'What time is it? "It is half past eight."',
      order_index: 3,
      explanation: '"half past eight" sakkiz yarim degan ma\'noni beradi (8:30).',
      options: [
        { id: 't1-q3-a', question_id: 't1-q3', option_key: 'A', option_text: '8:15', is_correct: false },
        { id: 't1-q3-b', question_id: 't1-q3', option_key: 'B', option_text: '8:30', is_correct: true },
        { id: 't1-q3-c', question_id: 't1-q3', option_key: 'C', option_text: '8:45', is_correct: false },
        { id: 't1-q3-d', question_id: 't1-q3', option_key: 'D', option_text: '7:30', is_correct: false }
      ]
    },
    {
      id: 't1-q4',
      test_id: 'test-1',
      question: 'I usually brush my ___ after breakfast.',
      order_index: 4,
      explanation: '"brush teeth" - tishlarni yuvmoq iborasi.',
      options: [
        { id: 't1-q4-a', question_id: 't1-q4', option_key: 'A', option_text: 'hands', is_correct: false },
        { id: 't1-q4-b', question_id: 't1-q4', option_key: 'B', option_text: 'teeth', is_correct: true },
        { id: 't1-q4-c', question_id: 't1-q4', option_key: 'C', option_text: 'face', is_correct: false },
        { id: 't1-q4-d', question_id: 't1-q4', option_key: 'D', option_text: 'hair', is_correct: false }
      ]
    },
    {
      id: 't1-q5',
      test_id: 'test-1',
      question: 'They ___ in the classroom now; they are in the gym.',
      order_index: 5,
      explanation: 'Inkor shakl: "They aren\'t in the classroom".',
      options: [
        { id: 't1-q5-a', question_id: 't1-q5', option_key: 'A', option_text: 'isn\'t', is_correct: false },
        { id: 't1-q5-b', question_id: 't1-q5', option_key: 'B', option_text: 'aren\'t', is_correct: true },
        { id: 't1-q5-c', question_id: 't1-q5', option_key: 'C', option_text: 'haven\'t', is_correct: false },
        { id: 't1-q5-d', question_id: 't1-q5', option_key: 'D', option_text: 'don\'t', is_correct: false }
      ]
    }
  ],
  'test-2': [
    {
      id: 't2-q1',
      test_id: 'test-2',
      question: 'Shakhlo ___ television every evening.',
      order_index: 1,
      explanation: 'Doimiy odat (every evening) uchun Present Simple ishlatiladi: watches.',
      options: [
        { id: 't2-q1-a', question_id: 't2-q1', option_key: 'A', option_text: 'watch', is_correct: false },
        { id: 't2-q1-b', question_id: 't2-q1', option_key: 'B', option_text: 'watches', is_correct: true },
        { id: 't2-q1-c', question_id: 't2-q1', option_key: 'C', option_text: 'is watching', is_correct: false },
        { id: 't2-q1-d', question_id: 't2-q1', option_key: 'D', option_text: 'watching', is_correct: false }
      ]
    },
    {
      id: 't2-q2',
      test_id: 'test-2',
      question: 'Listen! Someone ___ the piano beautifully.',
      order_index: 2,
      explanation: '"Listen!" ayni damda ro‘y berayotganini bildiradi: is playing.',
      options: [
        { id: 't2-q2-a', question_id: 't2-q2', option_key: 'A', option_text: 'plays', is_correct: false },
        { id: 't2-q2-b', question_id: 't2-q2', option_key: 'B', option_text: 'is playing', is_correct: true },
        { id: 't2-q2-c', question_id: 't2-q2', option_key: 'C', option_text: 'are playing', is_correct: false },
        { id: 't2-q2-d', question_id: 't2-q2', option_key: 'D', option_text: 'play', is_correct: false }
      ]
    },
    {
      id: 't2-q3',
      test_id: 'test-2',
      question: 'My brother ___ like mushrooms in soup.',
      order_index: 3,
      explanation: 'Uchinchi shaxs inkorida "doesn\'t like" ishlatiladi.',
      options: [
        { id: 't2-q3-a', question_id: 't2-q3', option_key: 'A', option_text: 'don\'t', is_correct: false },
        { id: 't2-q3-b', question_id: 't2-q3', option_key: 'B', option_text: 'doesn\'t', is_correct: true },
        { id: 't2-q3-c', question_id: 't2-q3', option_key: 'C', option_text: 'isn\'t', is_correct: false },
        { id: 't2-q3-d', question_id: 't2-q3', option_key: 'D', option_text: 'aren\'t', is_correct: false }
      ]
    },
    {
      id: 't2-q4',
      test_id: 'test-2',
      question: 'What ___ at the moment? - I am doing my homework.',
      order_index: 4,
      explanation: '"at the moment" so‘rog‘i: What are you doing?',
      options: [
        { id: 't2-q4-a', question_id: 't2-q4', option_key: 'A', option_text: 'do you do', is_correct: false },
        { id: 't2-q4-b', question_id: 't2-q4', option_key: 'B', option_text: 'are you doing', is_correct: true },
        { id: 't2-q4-c', question_id: 't2-q4', option_key: 'C', option_text: 'did you do', is_correct: false },
        { id: 't2-q4-d', question_id: 't2-q4', option_key: 'D', option_text: 'will you do', is_correct: false }
      ]
    },
    {
      id: 't2-q5',
      test_id: 'test-2',
      question: 'Water ___ at 100 degrees Celsius.',
      order_index: 5,
      explanation: 'Tabiat qonuni va doimiy haqiqat uchun Present Simple: boils.',
      options: [
        { id: 't2-q5-a', question_id: 't2-q5', option_key: 'A', option_text: 'boil', is_correct: false },
        { id: 't2-q5-b', question_id: 't2-q5', option_key: 'B', option_text: 'boils', is_correct: true },
        { id: 't2-q5-c', question_id: 't2-q5', option_key: 'C', option_text: 'is boiling', is_correct: false },
        { id: 't2-q5-d', question_id: 't2-q5', option_key: 'D', option_text: 'boiled', is_correct: false }
      ]
    }
  ],
  'test-3': [
    {
      id: 't3-q1',
      test_id: 'test-3',
      question: 'Can I have ___ water, please?',
      order_index: 1,
      explanation: 'Iltimos yoki taklif mazmunidagi savollarda "some" ishlatiladi.',
      options: [
        { id: 't3-q1-a', question_id: 't3-q1', option_key: 'A', option_text: 'some', is_correct: true },
        { id: 't3-q1-b', question_id: 't3-q1', option_key: 'B', option_text: 'any', is_correct: false },
        { id: 't3-q1-c', question_id: 't3-q1', option_key: 'C', option_text: 'a', is_correct: false },
        { id: 't3-q1-d', question_id: 't3-q1', option_key: 'D', option_text: 'many', is_correct: false }
      ]
    },
    {
      id: 't3-q2',
      test_id: 'test-3',
      question: '___ there any books on the shelf?',
      order_index: 2,
      explanation: '"books" ko‘plikda bo‘lgani uchun "Are there" ishlatiladi.',
      options: [
        { id: 't3-q2-a', question_id: 't3-q2', option_key: 'A', option_text: 'Is', is_correct: false },
        { id: 't3-q2-b', question_id: 't3-q2', option_key: 'B', option_text: 'Are', is_correct: true },
        { id: 't3-q2-c', question_id: 't3-q2', option_key: 'C', option_text: 'Do', is_correct: false },
        { id: 't3-q2-d', question_id: 't3-q2', option_key: 'D', option_text: 'Have', is_correct: false }
      ]
    },
    {
      id: 't3-q3',
      test_id: 'test-3',
      question: 'We have History lessons ___ Tuesdays and Thursdays.',
      order_index: 3,
      explanation: 'Hafta kunlari bilan "on" predlogi ishlatiladi.',
      options: [
        { id: 't3-q3-a', question_id: 't3-q3', option_key: 'A', option_text: 'at', is_correct: false },
        { id: 't3-q3-b', question_id: 't3-q3', option_key: 'B', option_text: 'in', is_correct: false },
        { id: 't3-q3-c', question_id: 't3-q3', option_key: 'C', option_text: 'on', is_correct: true },
        { id: 't3-q3-d', question_id: 't3-q3', option_key: 'D', option_text: 'to', is_correct: false }
      ]
    },
    {
      id: 't3-q4',
      test_id: 'test-3',
      question: 'Which of the following is UNCOUNTABLE?',
      order_index: 4,
      explanation: '"Bread" (non) sanalmaydigan ot hisoblanadi.',
      options: [
        { id: 't3-q4-a', question_id: 't3-q4', option_key: 'A', option_text: 'apple', is_correct: false },
        { id: 't3-q4-b', question_id: 't3-q4', option_key: 'B', option_text: 'sandwich', is_correct: false },
        { id: 't3-q4-c', question_id: 't3-q4', option_key: 'C', option_text: 'bread', is_correct: true },
        { id: 't3-q4-d', question_id: 't3-q4', option_key: 'D', option_text: 'egg', is_correct: false }
      ]
    },
    {
      id: 't3-q5',
      test_id: 'test-3',
      question: 'She ___ play tennis very well, she is the school champion.',
      order_index: 5,
      explanation: 'Qobiliyat ifodalash uchun "can" ishlatiladi.',
      options: [
        { id: 't3-q5-a', question_id: 't3-q5', option_key: 'A', option_text: 'can', is_correct: true },
        { id: 't3-q5-b', question_id: 't3-q5', option_key: 'B', option_text: 'can\'t', is_correct: false },
        { id: 't3-q5-c', question_id: 't3-q5', option_key: 'C', option_text: 'mustn\'t', is_correct: false },
        { id: 't3-q5-d', question_id: 't3-q5', option_key: 'D', option_text: 'is', is_correct: false }
      ]
    }
  ],
  'test-4': [
    {
      id: 't4-q1',
      test_id: 'test-4',
      question: 'Where ___ you yesterday at 5 o\'clock?',
      order_index: 1,
      explanation: 'O\'tgan zamonda "you" bilan "were" ishlatiladi.',
      options: [
        { id: 't4-q1-a', question_id: 't4-q1', option_key: 'A', option_text: 'was', is_correct: false },
        { id: 't4-q1-b', question_id: 't4-q1', option_key: 'B', option_text: 'were', is_correct: true },
        { id: 't4-q1-c', question_id: 't4-q1', option_key: 'C', option_text: 'are', is_correct: false },
        { id: 't4-q1-d', question_id: 't4-q1', option_key: 'D', option_text: 'did', is_correct: false }
      ]
    },
    {
      id: 't4-q2',
      test_id: 'test-4',
      question: 'We traveled from Tashkent to Samarkand ___ fast train.',
      order_index: 2,
      explanation: 'Transport vositasi bilan "by" predlogi ishlatiladi: by train.',
      options: [
        { id: 't4-q2-a', question_id: 't4-q2', option_key: 'A', option_text: 'by', is_correct: true },
        { id: 't4-q2-b', question_id: 't4-q2', option_key: 'B', option_text: 'on', is_correct: false },
        { id: 't4-q2-c', question_id: 't4-q2', option_key: 'C', option_text: 'in', is_correct: false },
        { id: 't4-q2-d', question_id: 't4-q2', option_key: 'D', option_text: 'with', is_correct: false }
      ]
    },
    {
      id: 't4-q3',
      test_id: 'test-4',
      question: 'They ___ football because it was raining heavily.',
      order_index: 3,
      explanation: 'Past Simple inkorida: "didn\'t play".',
      options: [
        { id: 't4-q3-a', question_id: 't4-q3', option_key: 'A', option_text: 'didn\'t play', is_correct: true },
        { id: 't4-q3-b', question_id: 't4-q3', option_key: 'B', option_text: 'don\'t play', is_correct: false },
        { id: 't4-q3-c', question_id: 't4-q3', option_key: 'C', option_text: 'weren\'t play', is_correct: false },
        { id: 't4-q3-d', question_id: 't4-q3', option_key: 'D', option_text: 'not played', is_correct: false }
      ]
    },
    {
      id: 't4-q4',
      test_id: 'test-4',
      question: 'Anvar ___ his project two days ago.',
      order_index: 4,
      explanation: '"two days ago" o‘tgan zamon belgisi: finished.',
      options: [
        { id: 't4-q4-a', question_id: 't4-q4', option_key: 'A', option_text: 'finish', is_correct: false },
        { id: 't4-q4-b', question_id: 't4-q4', option_key: 'B', option_text: 'finished', is_correct: true },
        { id: 't4-q4-c', question_id: 't4-q4', option_key: 'C', option_text: 'finishes', is_correct: false },
        { id: 't4-q4-d', question_id: 't4-q4', option_key: 'D', option_text: 'finishing', is_correct: false }
      ]
    },
    {
      id: 't4-q5',
      test_id: 'test-4',
      question: 'Did you ___ to the museum last Friday? - Yes, I did.',
      order_index: 5,
      explanation: 'So‘roq shaklida "Did"dan so‘ng fe’lning asl shakli (go) keladi.',
      options: [
        { id: 't4-q5-a', question_id: 't4-q5', option_key: 'A', option_text: 'go', is_correct: true },
        { id: 't4-q5-b', question_id: 't4-q5', option_key: 'B', option_text: 'went', is_correct: false },
        { id: 't4-q5-c', question_id: 't4-q5', option_key: 'C', option_text: 'gone', is_correct: false },
        { id: 't4-q5-d', question_id: 't4-q5', option_key: 'D', option_text: 'going', is_correct: false }
      ]
    }
  ],
  'test-5': [
    {
      id: 't5-q1',
      test_id: 'test-5',
      question: 'Which sentence is grammatically correct?',
      order_index: 1,
      explanation: '"He doesn\'t like cold weather" to‘g‘ri Present Simple inkor strukturasi.',
      options: [
        { id: 't5-q1-a', question_id: 't5-q1', option_key: 'A', option_text: 'He don\'t likes cold weather.', is_correct: false },
        { id: 't5-q1-b', question_id: 't5-q1', option_key: 'B', option_text: 'He doesn\'t like cold weather.', is_correct: true },
        { id: 't5-q1-c', question_id: 't5-q1', option_key: 'C', option_text: 'He not like cold weather.', is_correct: false },
        { id: 't5-q1-d', question_id: 't5-q1', option_key: 'D', option_text: 'He isn\'t like cold weather.', is_correct: false }
      ]
    },
    {
      id: 't5-q2',
      test_id: 'test-5',
      question: 'A cheetah is ___ than a horse.',
      order_index: 2,
      explanation: 'Sifatning qiyosiy darajasi: faster than.',
      options: [
        { id: 't5-q2-a', question_id: 't5-q2', option_key: 'A', option_text: 'fast', is_correct: false },
        { id: 't5-q2-b', question_id: 't5-q2', option_key: 'B', option_text: 'faster', is_correct: true },
        { id: 't5-q2-c', question_id: 't5-q2', option_key: 'C', option_text: 'more fast', is_correct: false },
        { id: 't5-q2-d', question_id: 't5-q2', option_key: 'D', option_text: 'fastest', is_correct: false }
      ]
    },
    {
      id: 't5-q3',
      test_id: 'test-5',
      question: 'Look at those dark clouds! It ___ rain.',
      order_index: 3,
      explanation: 'Dalil ko‘rinib turgan yaqin kelajak: is going to rain.',
      options: [
        { id: 't5-q3-a', question_id: 't5-q3', option_key: 'A', option_text: 'is going to', is_correct: true },
        { id: 't5-q3-b', question_id: 't5-q3', option_key: 'B', option_text: 'will be', is_correct: false },
        { id: 't5-q3-c', question_id: 't5-q3', option_key: 'C', option_text: 'was', is_correct: false },
        { id: 't5-q3-d', question_id: 't5-q3', option_key: 'D', option_text: 'are', is_correct: false }
      ]
    },
    {
      id: 't5-q4',
      test_id: 'test-5',
      question: 'English is spoken ___ many people around the world.',
      order_index: 4,
      explanation: 'Vosita/bajaruvchi predlogi: by.',
      options: [
        { id: 't5-q4-a', question_id: 't5-q4', option_key: 'A', option_text: 'by', is_correct: true },
        { id: 't5-q4-b', question_id: 't5-q4', option_key: 'B', option_text: 'with', is_correct: false },
        { id: 't5-q4-c', question_id: 't5-q4', option_key: 'C', option_text: 'from', is_correct: false },
        { id: 't5-q4-d', question_id: 't5-q4', option_key: 'D', option_text: 'at', is_correct: false }
      ]
    },
    {
      id: 't5-q5',
      test_id: 'test-5',
      question: '___ you ever been to the Charvak lake?',
      order_index: 5,
      explanation: 'Savol: "Have you ever been...?"',
      options: [
        { id: 't5-q5-a', question_id: 't5-q5', option_key: 'A', option_text: 'Did', is_correct: false },
        { id: 't5-q5-b', question_id: 't5-q5', option_key: 'B', option_text: 'Have', is_correct: true },
        { id: 't5-q5-c', question_id: 't5-q5', option_key: 'C', option_text: 'Are', is_correct: false },
        { id: 't5-q5-d', question_id: 't5-q5', option_key: 'D', option_text: 'Were', is_correct: false }
      ]
    }
  ]
};
