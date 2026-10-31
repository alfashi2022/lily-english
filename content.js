window.LILY_CONTENT = {
  companion: {
    name: "Pip",
    nameZh: "小狐狸 Pip",
  },

  // 比三年级上册稍进一步：because / but / so，Level 3 小故事用过去时。
  listen: [
    {
      id: "park",
      title: "A Fast Run",
      titleZh: "跑得太快了",
      theme: "公园",
      emoji: "🏃",
      minutes: 3,
      lines: [
        { en: "It's sunny, so Lily and Pip go to the park.", zh: "今天晴天，所以 Lily 和 Pip 去公园。" },
        { en: "Pip can run fast, and Lily runs too.", zh: "Pip 跑得很快，Lily 也跑。" },
        { en: "But Lily feels tired. She wants to sit down.", zh: "但是 Lily 累了。她想坐下。" },
        { en: "So they drink some cold juice.", zh: "所以他们喝了点冰果汁。" },
        { en: "Then Pip runs again. Lily says, \"Wait for me!\"", zh: "然后 Pip 又跑了。Lily 说：“等等我！”" },
        { en: "They feel happy because the park is fun.", zh: "他们很开心，因为公园很好玩。" },
      ],
    },
    {
      id: "family",
      title: "My Family Can",
      titleZh: "我家人会做什么",
      theme: "家人",
      emoji: "🏠",
      minutes: 3,
      lines: [
        { en: "This is my father. He is tall, and he can swim.", zh: "这是我的爸爸。他很高，而且会游泳。" },
        { en: "My mother can sing, but she can't draw.", zh: "我的妈妈会唱歌，但是不会画画。" },
        { en: "My brother runs with me after school.", zh: "放学后，哥哥和我一起跑步。" },
        { en: "My sister is small, but she can draw well.", zh: "我的妹妹小小的，但是很会画画。" },
        { en: "We eat together at home.", zh: "我们在家一起吃饭。" },
        { en: "I love my family because they play with me.", zh: "我爱我的家人，因为他们陪我玩。" },
      ],
    },
    {
      id: "rain",
      title: "Rain, Then Sun",
      titleZh: "雨停了",
      theme: "天气",
      emoji: "🌧️",
      minutes: 3,
      lines: [
        { en: "It's rainy, so Lily can't go to the park.", zh: "下雨了，所以 Lily 不能去公园。" },
        { en: "She feels sad because she wants to run.", zh: "她有点难过，因为她想去跑。" },
        { en: "Then her mother says, \"Let's read a book.\"", zh: "然后妈妈说：“我们来读书吧。”" },
        { en: "They read a story about a little fox.", zh: "他们读了一个小狐狸的故事。" },
        { en: "Later, the rain stops, and now it is sunny.", zh: "后来雨停了，现在是晴天。" },
        { en: "So Lily and Pip go to the park. She feels happy again.", zh: "所以 Lily 和 Pip 去了公园。她又开心了。" },
      ],
    },
    {
      id: "birthday",
      title: "The Red Ball",
      titleZh: "红球",
      theme: "生日",
      emoji: "🎂",
      minutes: 3,
      lines: [
        { en: "Yesterday was Lily's birthday. She felt happy.", zh: "昨天是 Lily 的生日。她很开心。" },
        { en: "Her mother made a cake, and Pip wanted some.", zh: "妈妈做了一个蛋糕，Pip 也想吃。" },
        { en: "Then Lily opened a gift. It was a small red ball.", zh: "然后 Lily 打开一份礼物。是一个小红球。" },
        { en: "They played, but the ball went under a chair.", zh: "他们玩了起来，可是球滚到了椅子下面。" },
        { en: "Pip looked and looked. Then he found the ball.", zh: "Pip 找了又找。然后他找到了球。" },
        { en: "They ate cake together. It was a happy day.", zh: "他们一起吃了蛋糕。这是开心的一天。" },
      ],
    },
  ],

  speak: {
    repeat: [
      { en: "I feel happy because it's sunny.", zh: "我很开心，因为是晴天。" },
      { en: "My mother can sing, but I can't.", zh: "我的妈妈会唱歌，但是我不会。" },
      { en: "It's rainy, so we stay at home.", zh: "下雨了，所以我们待在家里。" },
      { en: "I go to the park with my father.", zh: "我和爸爸去公园。" },
      { en: "Pip was hungry, so he ate an apple.", zh: "Pip 饿了，所以他吃了一个苹果。" },
      { en: "I like cats because they are small.", zh: "我喜欢猫，因为它们小小的。" },
      { en: "We had cake on my birthday.", zh: "我生日那天我们吃了蛋糕。" },
      { en: "She was sad, but now she feels happy.", zh: "她刚才难过，可是现在开心了。" },
    ],
    questions: [
      {
        en: "Why do you feel happy?",
        zh: "你为什么开心？",
        hint: "Because it's sunny.",
        hintZh: "因为是晴天。也可以说 birthday、park",
        accept: ["because", "sunny", "birthday", "park", "cake", "happy"],
      },
      {
        en: "What do you do when it's rainy?",
        zh: "下雨的时候你做什么？",
        hint: "I stay at home and read.",
        hintZh: "我待在家里看书。",
        accept: ["home", "read", "book", "stay", "draw", "inside"],
      },
      {
        en: "Who do you go to the park with?",
        zh: "你和谁去公园？",
        hint: "With my mother.",
        hintZh: "和妈妈。也可以说 father、friend",
        accept: ["mother", "mom", "mum", "father", "dad", "friend", "family", "sister", "brother", "pip"],
      },
      {
        en: "Where did Pip find the ball?",
        zh: "Pip 在哪里找到球的？",
        hint: "Under a chair.",
        hintZh: "在椅子下面。",
        accept: ["chair", "under"],
      },
    ],
    chats: [
      {
        id: "feelings",
        title: "How Do You Feel?",
        titleZh: "聊聊心情",
        theme: "情绪",
        emoji: "😊",
        steps: [
          {
            pip: "Hello! How do you feel today, and why?",
            pipZh: "你好！你今天感觉怎么样？为什么？",
            replies: [
              { en: "I feel happy because it's sunny.", zh: "我很开心，因为是晴天。", keys: ["sunny"], pip: "Sunny days are fun. I feel happy too.", pipZh: "晴天很好玩。我也很开心。" },
              { en: "I feel tired because I ran.", zh: "我有点累，因为我跑了。", keys: ["tired", "ran"], pip: "Then sit down and drink some juice.", pipZh: "那就坐下，喝点果汁。" },
              { en: "I feel sad because it's rainy.", zh: "我有点难过，因为下雨了。", keys: ["sad", "rainy"], pip: "We can read a book at home.", pipZh: "我们可以在家看书。" },
            ],
          },
          {
            pip: "What do you want to do now?",
            pipZh: "你现在想做什么？",
            replies: [
              { en: "I want to go to the park.", zh: "我想去公园。", keys: ["park"], pip: "Let's go. But wait for me!", pipZh: "我们走吧。但是要等等我！" },
              { en: "I want to read a book.", zh: "我想看书。", keys: ["read", "book"], pip: "Good. I like stories about foxes.", pipZh: "好。我喜欢狐狸的故事。" },
              { en: "I want to eat some cake.", zh: "我想吃蛋糕。", keys: ["cake"], pip: "Me too. Cake is sweet.", pipZh: "我也是。蛋糕甜甜的。" },
            ],
          },
          {
            pip: "Who do you play with?",
            pipZh: "你和谁一起玩？",
            replies: [
              { en: "I play with my mother.", zh: "我和妈妈玩。", keys: ["mother", "mom", "mum"], pip: "She can sing. That is nice.", pipZh: "她会唱歌。真好。" },
              { en: "I play with my friend.", zh: "我和朋友玩。", keys: ["friend"], pip: "Friends make a sunny day better.", pipZh: "有朋友，晴天更开心。" },
              { en: "I play with you, Pip.", zh: "我和你玩，Pip。", keys: ["you", "pip"], pip: "Hooray! I can run with you.", pipZh: "好耶！我可以和你一起跑。" },
            ],
          },
        ],
      },
      {
        id: "family",
        title: "My Family",
        titleZh: "聊聊家人",
        theme: "家人",
        emoji: "🏠",
        steps: [
          {
            pip: "Tell me about your father.",
            pipZh: "跟我说说你的爸爸。",
            replies: [
              { en: "He is tall, and he can swim.", zh: "他很高，而且会游泳。", keys: ["swim", "tall"], pip: "A tall dad who can swim. Fun!", pipZh: "又高又会游泳的爸爸。真有趣！" },
              { en: "He reads to me at night.", zh: "他晚上读书给我听。", keys: ["read", "reads", "night"], pip: "I like stories at night too.", pipZh: "我也喜欢晚上听故事。" },
              { en: "He cooks rice for us.", zh: "他给我们做米饭。", keys: ["cook", "cooks", "rice"], pip: "Rice is good when you are hungry.", pipZh: "饿的时候，米饭很好吃。" },
            ],
          },
          {
            pip: "What can your mother do?",
            pipZh: "你的妈妈会做什么？",
            replies: [
              { en: "She can sing, but she can't draw.", zh: "她会唱歌，但是不会画画。", keys: ["sing"], pip: "Singing is enough. I like songs.", pipZh: "会唱歌就很好。我喜欢歌。" },
              { en: "She can draw very well.", zh: "她很会画画。", keys: ["draw"], pip: "Ask her to draw a little fox.", pipZh: "请她画一只小狐狸吧。" },
              { en: "She can swim with me.", zh: "她可以和我一起游泳。", keys: ["swim"], pip: "Swimming on a hot day is nice.", pipZh: "热天游泳很舒服。" },
            ],
          },
          {
            pip: "Do you help at home?",
            pipZh: "你在家帮忙吗？",
            replies: [
              { en: "Yes. I help my mother.", zh: "会。我帮妈妈。", keys: ["yes", "help"], pip: "She is happy because you help.", pipZh: "你帮忙，她会很开心。" },
              { en: "I read with my sister.", zh: "我和妹妹一起看书。", keys: ["sister"], pip: "A small sister, and a good book.", pipZh: "小小的妹妹，还有一本好书。" },
              { en: "Not yet, but I want to.", zh: "还没有，但是我想帮忙。", keys: ["not", "want"], pip: "You can start today. That is kind.", pipZh: "你今天就可以开始。这很贴心。" },
            ],
          },
        ],
      },
      {
        id: "weather",
        title: "Sunny or Rainy?",
        titleZh: "聊聊天气",
        theme: "天气",
        emoji: "☀️",
        steps: [
          {
            pip: "What's the weather like today?",
            pipZh: "今天天气怎么样？",
            replies: [
              { en: "It's sunny, so let's go out.", zh: "晴天，所以我们出去吧。", keys: ["sunny"], pip: "Yes. The park is waiting.", pipZh: "好。公园在等我们。" },
              { en: "It's rainy, so we stay at home.", zh: "下雨了，所以我们待在家里。", keys: ["rainy", "rain"], pip: "Then we can read a book.", pipZh: "那我们可以看书。" },
              { en: "It's windy and a little cold.", zh: "有风，还有一点冷。", keys: ["windy", "cold"], pip: "Wear a warm coat, then play.", pipZh: "穿上暖和的外套再玩。" },
            ],
          },
          {
            pip: "What did you do yesterday?",
            pipZh: "你昨天做了什么？",
            replies: [
              { en: "I went to the park.", zh: "我去了公园。", keys: ["went", "park"], pip: "Did you run fast?", pipZh: "你跑得快吗？" },
              { en: "I stayed at home and read.", zh: "我待在家里看书。", keys: ["stayed", "home"], pip: "A quiet day can be a good day.", pipZh: "安静的一天也可以很好。" },
              { en: "I played with a red ball.", zh: "我玩了一个红球。", keys: ["played", "ball"], pip: "Don't let it go under the chair!", pipZh: "别让它滚到椅子下面！" },
            ],
          },
          {
            pip: "Why do you like sunny days?",
            pipZh: "你为什么喜欢晴天？",
            replies: [
              { en: "Because I can run outside.", zh: "因为我可以在外面跑。", keys: ["outside", "run"], pip: "I like to run outside too.", pipZh: "我也喜欢在外面跑。" },
              { en: "Because I can play with my dog.", zh: "因为我可以和我的狗玩。", keys: ["dog"], pip: "Dogs love sunny grass.", pipZh: "狗喜欢晴天的草地。" },
              { en: "I don't like sunny days.", zh: "我不喜欢晴天。", keys: ["don't", "dont", "don"], pip: "Then rainy days are your days.", pipZh: "那雨天就是你的日子。" },
            ],
          },
        ],
      },
      {
        id: "food",
        title: "What Do We Eat?",
        titleZh: "聊聊吃的",
        theme: "食物",
        emoji: "🍎",
        steps: [
          {
            pip: "I'm hungry. What shall we eat?",
            pipZh: "我饿了。我们吃什么？",
            replies: [
              { en: "Let's eat rice and fish.", zh: "我们吃米饭和鱼吧。", keys: ["rice", "fish"], pip: "A good dinner. I like fish.", pipZh: "这顿晚饭不错。我喜欢鱼。" },
              { en: "Let's eat a red apple.", zh: "我们吃一个红苹果吧。", keys: ["apple", "apples"], pip: "Apples are sweet. I want one.", pipZh: "苹果甜甜的。我想吃一个。" },
              { en: "I want some birthday cake.", zh: "我想吃生日蛋糕。", keys: ["cake"], pip: "Cake is for happy days.", pipZh: "蛋糕是留给开心日子的。" },
            ],
          },
          {
            pip: "What do you like to drink, and why?",
            pipZh: "你喜欢喝什么？为什么？",
            replies: [
              { en: "I like juice because it's sweet.", zh: "我喜欢果汁，因为它甜。", keys: ["juice"], pip: "Sweet and cold. Me too.", pipZh: "又甜又凉。我也是。" },
              { en: "I like milk before bed.", zh: "我睡觉前喜欢喝牛奶。", keys: ["milk", "bed"], pip: "Warm milk, then a story.", pipZh: "热牛奶，然后讲个故事。" },
              { en: "I don't like milk.", zh: "我不喜欢牛奶。", keys: ["don't", "dont", "don"], pip: "That's OK. Juice is here.", pipZh: "没关系。这里有果汁。" },
            ],
          },
          {
            pip: "What did you eat today?",
            pipZh: "你今天吃了什么？",
            replies: [
              { en: "I ate an apple.", zh: "我吃了一个苹果。", keys: ["apple", "apples"], pip: "Was it red and sweet?", pipZh: "它又红又甜吗？" },
              { en: "I ate some rice.", zh: "我吃了一些米饭。", keys: ["rice"], pip: "Rice makes you strong.", pipZh: "米饭让你有力气。" },
              { en: "I ate a little cake.", zh: "我吃了一点蛋糕。", keys: ["cake"], pip: "A little cake is still a happy cake.", pipZh: "一点点蛋糕也是开心的蛋糕。" },
            ],
          },
        ],
      },
    ],
  },

  readLevels: [
    { level: 1, name: "Level 1", hint: "一页两句，开始有 but / so" },
    { level: 2, name: "Level 2", hint: "要读出原因，because" },
    { level: 3, name: "Level 3", hint: "用过去时讲完一件事" },
  ],

  read: [
    {
      id: "fast-run",
      title: "A Fast Run",
      titleZh: "跑得太快了",
      level: 1,
      emoji: "🏃",
      pages: [
        {
          scene: "☀️🌳",
          lines: [
            { en: "It's sunny today.", zh: "今天是晴天。" },
            { en: "So Lily and Pip go to the park.", zh: "所以 Lily 和 Pip 去公园。" },
          ],
        },
        {
          scene: "🦊🏃",
          lines: [
            { en: "Pip can run fast.", zh: "Pip 跑得很快。" },
            { en: "Lily can run too.", zh: "Lily 也会跑。" },
          ],
        },
        {
          scene: "👧😮",
          lines: [
            { en: "But Lily feels tired.", zh: "但是 Lily 累了。" },
            { en: "She wants to sit down.", zh: "她想坐下。" },
          ],
        },
        {
          scene: "🧃",
          lines: [
            { en: "So they drink some juice.", zh: "所以他们喝了点果汁。" },
            { en: "The juice is cold.", zh: "果汁凉凉的。" },
          ],
        },
        {
          scene: "🦊",
          lines: [
            { en: "Then Pip runs again.", zh: "然后 Pip 又跑了。" },
            { en: "\"Wait for me!\" says Lily.", zh: "Lily 说：“等等我！”" },
          ],
        },
        {
          scene: "👧🦊😊",
          lines: [
            { en: "They feel happy.", zh: "他们很开心。" },
            { en: "The park is fun.", zh: "公园很好玩。" },
          ],
        },
      ],
      check: {
        ask: "Why does Lily sit down?",
        askZh: "Lily 为什么坐下？",
        options: [
          { en: "Because she feels tired.", zh: "因为她累了。", ok: true },
          { en: "Because she feels hungry.", zh: "因为她饿了。", ok: false },
        ],
      },
    },
    {
      id: "where-is-mimi",
      title: "Where Is Mimi?",
      titleZh: "Mimi 在哪里？",
      level: 1,
      emoji: "🐱",
      pages: [
        {
          scene: "🐱",
          lines: [
            { en: "This is Mimi.", zh: "这是 Mimi。" },
            { en: "She is a small cat.", zh: "她是一只小猫。" },
          ],
        },
        {
          scene: "👧❓",
          lines: [
            { en: "Lily wants to play.", zh: "Lily 想玩。" },
            { en: "But Mimi is not here.", zh: "可是 Mimi 不在这儿。" },
          ],
        },
        {
          scene: "🪑",
          lines: [
            { en: "Lily looks under the chair.", zh: "Lily 往椅子下面看。" },
            { en: "She looks and looks.", zh: "她看了又看。" },
          ],
        },
        {
          scene: "🐱🪑",
          lines: [
            { en: "Mimi is under the chair.", zh: "Mimi 在椅子下面。" },
            { en: "She feels sleepy.", zh: "她想睡觉。" },
          ],
        },
        {
          scene: "👧🐱",
          lines: [
            { en: "\"Come here, Mimi,\" says Lily.", zh: "Lily 说：“Mimi，过来。”" },
            { en: "The cat comes out.", zh: "小猫出来了。" },
          ],
        },
        {
          scene: "🐱😊",
          lines: [
            { en: "Now they can play.", zh: "现在他们可以玩了。" },
            { en: "Lily likes her small cat.", zh: "Lily 喜欢她的小猫。" },
          ],
        },
      ],
      check: {
        ask: "Where is Mimi?",
        askZh: "Mimi 在哪里？",
        options: [
          { en: "She is under the chair.", zh: "她在椅子下面。", ok: true },
          { en: "She is in the park.", zh: "她在公园里。", ok: false },
        ],
      },
    },
    {
      id: "rain-then-sun",
      title: "Rain, Then Sun",
      titleZh: "雨停了",
      level: 2,
      emoji: "🌧️",
      pages: [
        {
          scene: "🌧️",
          lines: [
            { en: "It's rainy today.", zh: "今天下雨了。" },
            { en: "So Lily can't go to the park.", zh: "所以 Lily 不能去公园。" },
          ],
        },
        {
          scene: "😢",
          lines: [
            { en: "She feels sad.", zh: "她有点难过。" },
            { en: "She wants to run, but she can't.", zh: "她想跑，但是不能跑。" },
          ],
        },
        {
          scene: "👩📖",
          lines: [
            { en: "Then her mother says, \"Let's read.\"", zh: "然后妈妈说：“我们来读书吧。”" },
            { en: "They read a book about a fox.", zh: "他们读了一本关于狐狸的书。" },
          ],
        },
        {
          scene: "🦊📖",
          lines: [
            { en: "Pip likes the story.", zh: "Pip 喜欢这个故事。" },
            { en: "Lily feels better because the book is fun.", zh: "Lily 感觉好一点了，因为这本书很好玩。" },
          ],
        },
        {
          scene: "☀️",
          lines: [
            { en: "Later, the rain stops.", zh: "后来，雨停了。" },
            { en: "Now it is sunny.", zh: "现在是晴天。" },
          ],
        },
        {
          scene: "👧🦊",
          lines: [
            { en: "So they go to the park.", zh: "所以他们去公园。" },
            { en: "Lily feels happy again.", zh: "Lily 又开心了。" },
          ],
        },
      ],
      check: {
        ask: "Why does Lily feel sad at first?",
        askZh: "Lily 一开始为什么难过？",
        options: [
          { en: "Because she can't go to the park.", zh: "因为她不能去公园。", ok: true },
          { en: "Because she can't read.", zh: "因为她不会读书。", ok: false },
        ],
      },
    },
    {
      id: "my-family",
      title: "They Can",
      titleZh: "他们会",
      level: 2,
      emoji: "🏠",
      pages: [
        {
          scene: "👨🏊",
          lines: [
            { en: "This is my father.", zh: "这是我的爸爸。" },
            { en: "He is tall, and he can swim.", zh: "他很高，而且会游泳。" },
          ],
        },
        {
          scene: "👩🎤",
          lines: [
            { en: "This is my mother.", zh: "这是我的妈妈。" },
            { en: "She can sing, but she can't draw.", zh: "她会唱歌，但是不会画画。" },
          ],
        },
        {
          scene: "👦🏃",
          lines: [
            { en: "My brother is fast.", zh: "我的哥哥跑得快。" },
            { en: "He runs with me after school.", zh: "放学后他和我一起跑。" },
          ],
        },
        {
          scene: "👧🖍️",
          lines: [
            { en: "My sister is small.", zh: "我的妹妹小小的。" },
            { en: "But she can draw very well.", zh: "但是她很会画画。" },
          ],
        },
        {
          scene: "🍚",
          lines: [
            { en: "We eat together at home.", zh: "我们在家一起吃饭。" },
            { en: "Dinner is rice and fish.", zh: "晚饭是米饭和鱼。" },
          ],
        },
        {
          scene: "🏠❤️",
          lines: [
            { en: "I love my family.", zh: "我爱我的家人。" },
            { en: "I love them because they play with me.", zh: "我爱他们，因为他们陪我玩。" },
          ],
        },
      ],
      check: {
        ask: "Who can draw?",
        askZh: "谁会画画？",
        options: [
          { en: "My sister can draw.", zh: "我的妹妹会画画。", ok: true },
          { en: "My mother can draw.", zh: "我的妈妈会画画。", ok: false },
        ],
      },
    },
    {
      id: "red-apple",
      title: "The Red Apple",
      titleZh: "红苹果",
      level: 3,
      emoji: "🍎",
      pages: [
        {
          scene: "🦊😋",
          lines: [
            { en: "Yesterday Pip was hungry.", zh: "昨天 Pip 饿了。" },
            { en: "He wanted a red apple.", zh: "他想要一个红苹果。" },
          ],
        },
        {
          scene: "🍳",
          lines: [
            { en: "He looked in the kitchen.", zh: "他在厨房里找。" },
            { en: "But he did not see an apple.", zh: "可是他没看到苹果。" },
          ],
        },
        {
          scene: "🌳",
          lines: [
            { en: "Then he went to the park.", zh: "然后他去了公园。" },
            { en: "He saw a big green tree.", zh: "他看见一棵大绿树。" },
          ],
        },
        {
          scene: "🍎",
          lines: [
            { en: "There was an apple under the tree.", zh: "树下有一个苹果。" },
            { en: "It was red and small.", zh: "它又红又小。" },
          ],
        },
        {
          scene: "👧🍎",
          lines: [
            { en: "Lily was there too.", zh: "Lily 也在那儿。" },
            { en: "\"This apple is for you,\" she said.", zh: "她说：“这个苹果给你。”" },
          ],
        },
        {
          scene: "🦊😊",
          lines: [
            { en: "Pip ate the apple.", zh: "Pip 吃了苹果。" },
            { en: "He was happy because it was sweet.", zh: "他很开心，因为它甜甜的。" },
          ],
        },
      ],
      check: {
        ask: "Where did Pip find the apple?",
        askZh: "Pip 在哪里找到苹果的？",
        options: [
          { en: "Under a tree in the park.", zh: "在公园的一棵树下。", ok: true },
          { en: "In the kitchen at home.", zh: "在家里的厨房。", ok: false },
        ],
      },
    },
    {
      id: "red-ball",
      title: "The Red Ball",
      titleZh: "红球",
      level: 3,
      emoji: "🎂",
      pages: [
        {
          scene: "🎂",
          lines: [
            { en: "Yesterday was Lily's birthday.", zh: "昨天是 Lily 的生日。" },
            { en: "She felt happy all day.", zh: "她一整天都很开心。" },
          ],
        },
        {
          scene: "👩🍰",
          lines: [
            { en: "Her mother made a cake.", zh: "妈妈做了一个蛋糕。" },
            { en: "Pip wanted some cake too.", zh: "Pip 也想吃蛋糕。" },
          ],
        },
        {
          scene: "🎁",
          lines: [
            { en: "Then Lily opened a gift.", zh: "然后 Lily 打开一份礼物。" },
            { en: "It was a small red ball.", zh: "是一个小红球。" },
          ],
        },
        {
          scene: "⚽🪑",
          lines: [
            { en: "They played in the room.", zh: "他们在房间里玩。" },
            { en: "But the ball went under a chair.", zh: "可是球滚到了椅子下面。" },
          ],
        },
        {
          scene: "🦊🔍",
          lines: [
            { en: "Pip looked and looked.", zh: "Pip 找了又找。" },
            { en: "Then he found the ball.", zh: "然后他找到了球。" },
          ],
        },
        {
          scene: "👧🦊🍰",
          lines: [
            { en: "They ate the cake together.", zh: "他们一起吃了蛋糕。" },
            { en: "It was a happy day.", zh: "这是开心的一天。" },
          ],
        },
      ],
      check: {
        ask: "What was in the gift?",
        askZh: "礼物里是什么？",
        options: [
          { en: "A small red ball.", zh: "一个小红球。", ok: true },
          { en: "A new book.", zh: "一本新书。", ok: false },
        ],
      },
    },
  ],

  words: [
    {
      id: "feelings",
      title: "Feelings",
      titleZh: "情绪",
      emoji: "😊",
      items: [
        { en: "I feel happy because it's sunny.", zh: "我很开心，因为是晴天。", emoji: "😊" },
        { en: "I feel sad because it's rainy.", zh: "我有点难过，因为下雨了。", emoji: "😢" },
        { en: "I feel tired, so I sit down.", zh: "我累了，所以我坐下。", emoji: "😴" },
        { en: "I was hungry, so I ate an apple.", zh: "我饿了，所以我吃了一个苹果。", emoji: "🍎" },
        { en: "I was sad, but now I feel happy.", zh: "我刚才难过，可是现在开心了。", emoji: "🙂" },
        { en: "She feels sleepy, so she sits down.", zh: "她想睡觉，所以她坐下。", emoji: "🐱" },
      ],
    },
    {
      id: "family",
      title: "Family",
      titleZh: "家人",
      emoji: "🏠",
      items: [
        { en: "My father is tall, and he can swim.", zh: "我的爸爸很高，而且会游泳。", emoji: "👨" },
        { en: "My mother can sing, but she can't draw.", zh: "我的妈妈会唱歌，但是不会画画。", emoji: "👩" },
        { en: "My brother runs with me after school.", zh: "放学后哥哥和我一起跑。", emoji: "👦" },
        { en: "My sister is small, but she can draw.", zh: "我的妹妹小小的，但是会画画。", emoji: "👧" },
        { en: "We eat together at home.", zh: "我们在家一起吃饭。", emoji: "🍚" },
        { en: "I love them because they play with me.", zh: "我爱他们，因为他们陪我玩。", emoji: "❤️" },
      ],
    },
    {
      id: "looks",
      title: "Looks",
      titleZh: "样子",
      emoji: "🪞",
      items: [
        { en: "The tree is tall and green.", zh: "这棵树又高又绿。", emoji: "🌳" },
        { en: "My brother is tall, but I am short.", zh: "哥哥很高，可是我很矮。", emoji: "👦" },
        { en: "The cat is small and white.", zh: "这只猫又小又白。", emoji: "🐱" },
        { en: "The ball is small and red.", zh: "球又小又红。", emoji: "🔴" },
        { en: "He is thin, but he can run fast.", zh: "他很瘦，但是跑得快。", emoji: "🏃" },
        { en: "The apple is red and sweet.", zh: "苹果又红又甜。", emoji: "🍎" },
      ],
    },
    {
      id: "fun",
      title: "Have Fun",
      titleZh: "玩耍",
      emoji: "⚽",
      items: [
        { en: "I can swim, but I can't fly.", zh: "我会游泳，但是我不会飞。", emoji: "🏊" },
        { en: "I like to draw after school.", zh: "我喜欢放学后画画。", emoji: "🖍️" },
        { en: "We run, then we drink juice.", zh: "我们先跑，然后喝果汁。", emoji: "🧃" },
        { en: "She can sing and dance.", zh: "她会唱歌，也会跳舞。", emoji: "🎤" },
        { en: "I stayed at home and read a book.", zh: "我待在家里看了一本书。", emoji: "📖" },
        { en: "What can you do on a sunny day?", zh: "晴天你能做什么？", emoji: "☀️" },
      ],
    },
    {
      id: "food",
      title: "Food",
      titleZh: "食物",
      emoji: "🍎",
      items: [
        { en: "I like apples because they are sweet.", zh: "我喜欢苹果，因为它们甜。", emoji: "🍎" },
        { en: "We eat rice and fish for dinner.", zh: "晚饭我们吃米饭和鱼。", emoji: "🍚" },
        { en: "I don't like milk, but I like juice.", zh: "我不喜欢牛奶，但是我喜欢果汁。", emoji: "🧃" },
        { en: "Pip was hungry, so he ate an apple.", zh: "Pip 饿了，所以他吃了一个苹果。", emoji: "🦊" },
        { en: "Do you want some cake?", zh: "你想吃点蛋糕吗？", emoji: "🍰" },
        { en: "The cake was sweet, and we ate it.", zh: "蛋糕甜甜的，我们吃了。", emoji: "😋" },
      ],
    },
    {
      id: "animals",
      title: "Small Animals",
      titleZh: "小动物",
      emoji: "🐾",
      items: [
        { en: "The cat is small, but it can jump.", zh: "猫小小的，但是它会跳。", emoji: "🐱" },
        { en: "Dogs can run fast in the park.", zh: "狗可以在公园里跑得很快。", emoji: "🐶" },
        { en: "Mimi was under the chair.", zh: "Mimi 在椅子下面。", emoji: "🪑" },
        { en: "The bird can fly, but the duck can swim.", zh: "鸟会飞，但是鸭子会游泳。", emoji: "🦆" },
        { en: "I like rabbits because they are soft.", zh: "我喜欢兔子，因为它们软软的。", emoji: "🐰" },
        { en: "Pip saw a bird in the tree.", zh: "Pip 看见树上有一只鸟。", emoji: "🐦" },
      ],
    },
    {
      id: "weather",
      title: "Weather",
      titleZh: "天气",
      emoji: "🌤️",
      items: [
        { en: "It's sunny, so let's go to the park.", zh: "晴天，所以我们去公园吧。", emoji: "☀️" },
        { en: "It's rainy, so we stay at home.", zh: "下雨了，所以我们待在家里。", emoji: "🌧️" },
        { en: "It was windy yesterday.", zh: "昨天有风。", emoji: "💨" },
        { en: "It was rainy, but now it's sunny.", zh: "刚才下雨，可是现在晴了。", emoji: "🌤️" },
        { en: "It's hot, and I feel thirsty.", zh: "很热，而且我渴了。", emoji: "🥵" },
        { en: "What's the weather like today?", zh: "今天天气怎么样？", emoji: "❓" },
      ],
    },
    {
      id: "birthday",
      title: "Birthday",
      titleZh: "生日",
      emoji: "🎂",
      items: [
        { en: "Yesterday was Lily's birthday.", zh: "昨天是 Lily 的生日。", emoji: "🎂" },
        { en: "Her mother made a cake.", zh: "妈妈做了一个蛋糕。", emoji: "🍰" },
        { en: "The gift was a small red ball.", zh: "礼物是一个小红球。", emoji: "🎁" },
        { en: "They played, and then they ate cake.", zh: "他们先玩，然后吃了蛋糕。", emoji: "⚽" },
        { en: "Pip was happy because he found the ball.", zh: "Pip 很开心，因为他找到了球。", emoji: "🦊" },
        { en: "It was a happy day.", zh: "这是开心的一天。", emoji: "😊" },
      ],
    },
  ],
};
