const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const { writeFileSync } = require('fs');
const { formatDate } = require('@dwing/common');

axios.get('https://github.com/trending').then(({ data }) => {
  const $ = cheerio.load(data);
  const arr = [];
  $('.repo-list li').each((i, elm) => {
    const lang = $(elm).find('[itemprop="programmingLanguage"]');
    const item = {
      title: $(elm).find('h3 a').text().replace(/\s/g, ''),
      url: `https://github.com${$(elm).find('h3 a').attr('href')}`
    };
    if (lang.length !== 0) {
      item.lang = lang.text().replace(/\s/g, '');
    }
    arr.push(item);
  });
  const date = formatDate('yyyy-MM-dd');
  writeFileSync(path.resolve(__dirname, '../data/', `${date}.json`), JSON.stringify(arr, null, 2), 'utf-8');
  const md = [`# ${date}`, '', ...arr.map(({ title, url, lang }, i) => `${i + 1}. [${title}](${url}) ${lang === undefined ? '' : `【${lang}】`}`), ''];
  writeFileSync(path.resolve(__dirname, '../archives/', `${date}.md`), md.join('\n'), 'utf-8');
});
