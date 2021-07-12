// @flow strict
import getContactHref from './get-contact-href';

test('getContactHref', () => {
  expect(getContactHref('twitter', '#')).toBe('https://www.twitter.com/bakermoran');
  expect(getContactHref('github', '#')).toBe('https://github.com/bakermoran');
  expect(getContactHref('email', '#')).toBe('mailto:baker.moran@gmail.com');
  expect(getContactHref('vkontakte', '#')).toBe('https://vk.com/#');
  expect(getContactHref('telegram', '#')).toBe('https://t.me/#');
  expect(getContactHref('rss', '#')).toBe('#');
  expect(getContactHref('linkedin', '#')).toBe('https://www.linkedin.com/in/baker-moran-a47b17114/');
  expect(getContactHref('instagram', '#')).toBe('https://www.instagram.com/#');
  expect(getContactHref('line', '#')).toBe('line://ti/p/#');
  expect(getContactHref('facebook', '#')).toBe('https://www.facebook.com/#');
  expect(getContactHref('gitlab', '#')).toBe('https://www.gitlab.com/#');
  expect(getContactHref('weibo', '#')).toBe('https://www.weibo.com/#');
  expect(getContactHref('codepen', '#')).toBe('https://www.codepen.io/#');
  expect(getContactHref('youtube', '#')).toBe('https://www.youtube.com/channel/#');
  expect(getContactHref('soundcloud', '#')).toBe('https://soundcloud.com/#');
  expect(getContactHref('medium', '#')).toBe('https://medium.com/#');
});
