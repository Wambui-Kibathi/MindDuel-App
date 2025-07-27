// utils/topics.js

export const topicMap = {
    'general-knowledge': 'General Knowledge',
    'literature': 'Literature',
    'art': 'Art',
    'entertainment': 'Entertainment',
};
  
export function getTopicNameFromSlug(slug) {
    return topicMap[slug] || slug;
}
  
export function getSlugFromTopicName(name) {
    return Object.entries(topicMap).find(([slug, fullName]) => fullName === name)?.[0] || name;
}  