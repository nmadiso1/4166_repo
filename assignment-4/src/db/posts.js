export const posts = [
  {
    id: 1,
    title: 'My First Blog',
    content: 'This is my first blog',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Tech Thoughts',
    content: 'Exploring new patterns in backend design.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'Workout Log',
    content: 'Hit a solid chest and back session today.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'Random Inspiration',
    content: 'Sometimes the best ideas come unexpectedly.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: 'Learning Journey',
    content: 'Diving deeper into JavaScript modules.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: 'Weekend Plans',
    content: 'Thinking about hiking or coding… maybe both.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: 'Late Night Coding',
    content: 'Fixed a bug that’s been haunting me for days.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 8, title: 'Food Review',
    content: 'Tried a new taco place — absolutely worth it.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    title: 'Music Vibes',
    content: 'Found a playlist that hits perfectly while coding.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    title: 'Daily Gratitude',
    content: 'Appreciating progress, even the small steps.',
    createdAt: new Date().toISOString(),
  },

];
let nextId = posts.length;

export function getNextId() {
  nextId++;
  return nextId;
}

export function resetDb() {
  posts.length = 0;
  nextId = posts.length;
}
