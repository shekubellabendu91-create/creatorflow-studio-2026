(() => {
  'use strict';

  const platformNames = Object.freeze({
    tiktok: 'TikTok',
    instagram: 'Instagram Reels',
    youtube: 'YouTube Shorts',
    facebook: 'Facebook Reels'
  });

  const platformHashtags = Object.freeze({
    tiktok: '#tiktok',
    instagram: '#instagramreels',
    youtube: '#youtubeshorts',
    facebook: '#facebookreels'
  });

  const toneNames = Object.freeze({
    bold: 'bold',
    friendly: 'friendly',
    educational: 'educational',
    motivational: 'motivational'
  });

  function cleanTopic(value) {
    return String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().replace(/\s+/g, ' ');
  }

  function validateTopic(value) {
    const topic = cleanTopic(value);
    if (!topic) {
      throw new TypeError('A topic is required to generate content.');
    }
    if (topic.length > 200) {
      throw new RangeError('Please keep the topic to 200 characters or fewer.');
    }
    return topic;
  }

  function topicHashtag(topic) {
    const slug = cleanTopic(topic)
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .match(/[\p{L}\p{N}]+/gu);
    return `#${(slug || []).slice(0, 4).join('') || 'content'}`;
  }

  function buildContent(rawTopic, platform, tone) {
    const topic = validateTopic(rawTopic);
    const platformName = platformNames[platform] || 'short-form video';
    const toneName = toneNames[tone] || 'friendly';
    const hooks = {
      bold: `Stop scrolling: here's what you need to know about ${topic}.`,
      friendly: `Let's talk about ${topic} in a simple way.`,
      educational: `Here's a simple breakdown of ${topic}.`,
      motivational: `You can make real progress with ${topic}—start here.`
    };
    const hook = hooks[tone] || hooks.friendly;
    const script = `Hook: ${hook}\n\nPoint 1: Start by understanding the most important part of ${topic}.\nPoint 2: Keep your approach simple, practical, and consistent.\nPoint 3: Take one useful action today instead of waiting for the perfect moment.\n\nFor ${platformName}, keep the delivery clear, energetic, and easy to follow.`;
    const caption = `Want a simple way to think about ${topic}? Save this post and try one step today. #${toneName}`;
    const cta = `Follow for more practical content about ${topic}, and share this with someone who needs it.`;
    const hashtags = [platformHashtags[platform] || '#content', '#creator', '#contentcreator', topicHashtag(topic), '#contenttips', '#creatortips']
      .join(' ');

    return { hook, script, caption, cta, hashtags };
  }

  const api = Object.freeze({ cleanTopic, validateTopic, topicHashtag, buildContent });
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.CreatorFlowContent = api;
})();
