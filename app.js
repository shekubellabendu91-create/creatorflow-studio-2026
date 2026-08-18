const topicInput = document.getElementById('topic');
const platformInput = document.getElementById('platform');
const toneInput = document.getElementById('tone');
const generateButton = document.getElementById('generate');
const errorEl = document.getElementById('error');
const resultsEl = document.getElementById('results');

const outputIds = ['hook', 'script', 'caption', 'cta', 'hashtags'];

const platformNames = {
  tiktok: 'TikTok',
  instagram: 'Instagram Reels',
  youtube: 'YouTube Shorts',
  facebook: 'Facebook Reels'
};

const platformHashtags = {
  tiktok: '#tiktok',
  instagram: '#instagramreels',
  youtube: '#youtubeshorts',
  facebook: '#facebookreels'
};

const toneNames = {
  bold: 'bold',
  friendly: 'friendly',
  educational: 'educational',
  motivational: 'motivational'
};

function cleanTopic(value) {
  return value.trim().replace(/\s+/g, ' ');
}

function topicHashtag(topic) {
  const words = topic.toLowerCase().match(/[a-z0-9]+/g) || [];
  return `#${words.slice(0, 4).join('') || 'content'}`;
}

function buildContent(topic, platform, tone) {
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
  const hashtags = `${platformHashtags[platform] || '#content'} #creator #contentcreator ${topicHashtag(topic)} #contenttips #creatortips`;

  return { hook, script, caption, cta, hashtags };
}

function generate() {
  const topic = cleanTopic(topicInput.value);
  errorEl.textContent = '';

  if (!topic) {
    resultsEl.hidden = true;
    errorEl.textContent = 'Please enter a topic first.';
    topicInput.focus();
    return;
  }

  const content = buildContent(topic, platformInput.value, toneInput.value);
  outputIds.forEach((id) => {
    document.getElementById(id).textContent = content[id];
  });

  resultsEl.hidden = false;
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function legacyCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
}

async function copyOutput(id, button) {
  const text = document.getElementById(id).textContent;
  if (!text) return;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else if (!legacyCopy(text)) {
      throw new Error('Copy unavailable');
    }

    const original = button.textContent;
    button.textContent = 'Copied!';
    setTimeout(() => { button.textContent = original; }, 1200);
    errorEl.textContent = '';
  } catch {
    errorEl.textContent = 'Copy failed. Please select and copy the text manually.';
  }
}

generateButton.addEventListener('click', generate);
topicInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) generate();
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', () => copyOutput(button.dataset.copy, button));
});
