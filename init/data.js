const samplePosts = [
  {
    title: 'Doomsday behind the scenes leaked Spoilers Leart',
    content: "Toh Guru-Log! & Pop-Culture Enthusiasts! Welcome to thePJ - Cinema (PJ Explained) subreddit. We're all about exploring films, TV shows, anime, and more with a twist! Join us to geek out, share theories, and be part of our buzzing community.",
    url: 'https://preview.redd.it/doomsday-behind-the-scenes-leaked-v0-xk40bimho1kh1.jpg?width=552&format=pjpg&auto=webp&s=acff1ed3ef8796db0193e787f1d0d2ba6aef5bd3',
    comments: []
  },
  {
    title: "Which Bollywood movie kept it's plotline perfectly hidden until the movie got released?",
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab corporis modi dolores numquam voluptates libero fuga laborum, cumque illum minima molestias dicta sapiente placeat perferendis harum non tempore, reprehenderit alias.',
    url: 'https://preview.redd.it/which-bollywood-movie-kept-its-plotline-perfectly-hidden-v0-9sg0aih4a4hh1.jpeg?width=1080&crop=smart&auto=webp&s=4565efd0b32cc066b22a8e48283c790ae4a330a7',
    comments: []
  },
  {
    title: 'Why does every app need an account nowadays?',
    content: 'I just wanted to check the price of a product and somehow ended up creating an account, verifying my email, accepting 17 permissions and solving a captcha. Are we really at the point where calculators will require login?',
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    comments: []
  },
  {
    title: 'Finally started watching One Piece and I understand the hype now',
    content: 'I kept avoiding One Piece because of the episode count, but I finally started watching it. The world building is honestly insane. I thought I would drop it after a few episodes but now I am completely invested.',
    url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477',
    comments: []
  },
  {
    title: 'Does anyone else get their best ideas at 2 AM?',
    content: 'During the day my brain refuses to cooperate. Then suddenly at 2 AM I get ten amazing ideas and convince myself that tomorrow I will completely change my life. Tomorrow arrives and I remember absolutely nothing.',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
    comments: []
  },
  {
    title: 'What is one food you could eat every single day?',
    content: 'For me it has to be biryani. I could probably eat it three times a week without getting bored. Curious what everyone else would choose if they were only allowed to pick one dish.',
    url: 'https://images.unsplash.com/photo-1563379091339-03246963d96c',
    comments: []
  },
  {
    title: 'That one movie you can watch repeatedly without getting bored',
    content: 'There are some movies where you already know every scene and every dialogue but still end up watching them whenever they are on TV. What is that movie for you?',
    url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
    comments: []
  },
  {
    title: 'Nothing beats fixing a bug after staring at it for three hours',
    content: 'Spent the entire evening debugging something that turned out to be a single missing character. The happiness after finally finding it is honestly unmatched. Developers know exactly what I mean.',
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    comments: []
  },
  {
    title: 'What game had the best graphics for its time?',
    content: 'I was looking at some old games today and realized how impressive certain titles were considering the hardware they were running on. Which game made you stop and think, wow, this looks incredible?',
    url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e',
    comments: []
  },
  {
    title: 'What is the most beautiful place you have ever visited?',
    content: 'Not necessarily the most expensive or famous place, just somewhere that genuinely surprised you. I love hearing about hidden places that do not usually show up in travel guides.',
    url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7',
    comments: []
  },
  {
    title: 'Why do weekends disappear so quickly?',
    content: 'Friday evening feels like the weekend has just started and suddenly it is Sunday night. Meanwhile Monday feels like it lasts approximately 47 hours.',
    url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe',
    comments: []
  },
  {
    title: 'Recommend me a book that completely changed your perspective',
    content: 'I am looking for something that makes you think differently rather than just another entertaining story. Fiction, non-fiction, psychology, philosophy — anything is welcome.',
    url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    comments: []
  },
  {
    title: 'The best football match you have ever watched?',
    content: 'There have been so many legendary matches over the years that choosing just one feels impossible. Looking for recommendations from matches that were genuinely unforgettable.',
    url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
    comments: []
  },
  {
    title: 'Me opening my laptop to study vs what actually happens',
    content: 'Open laptop. Open VS Code. Check YouTube for one tutorial. Watch completely unrelated videos for two hours. Close laptop. Promise myself tomorrow will be different.',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    comments: []
  },
  {
    title: 'Is sleeping early actually possible?',
    content: 'Every night I tell myself I am going to sleep at 11. Then somehow it becomes 12, then 1, and suddenly I am researching something completely random that I did not even care about five minutes ago.',
    url: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a',
    comments: []
  },
  {
    title: 'What is a completely useless fact that you know?',
    content: 'I love collecting random facts that have absolutely no practical use. Drop the weirdest useless fact you know. Bonus points if it is something that sounds fake but is actually true.',
    url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a',
    comments: []
  },
  {
    title: 'Building a project is fun until you have to make it responsive',
    content: 'Everything looked perfect on my laptop. Then I opened it on my phone and suddenly buttons disappeared, text overflowed and the entire layout looked like it had been attacked.',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    comments: []
  },
  {
    title: 'What is something everyone seems to love but you absolutely hate?',
    content: 'Could be a food, movie, game, trend, technology or literally anything. No judgement here. Sometimes popular things just do not work for everyone.',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    comments: []
  }
];

module.exports = { data: samplePosts };