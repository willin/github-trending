const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const { writeFileSync } = require('fs');
const { formatDate } = require('@dwing/common');


axios.get('https://github.com/trending').then(({ data }) => {
  const $ = cheerio.load(data);
  const date = formatDate('yyyy-MM-dd');
  const md = [`# ${date}`, ''];
  $('.repo-list li').each((i, elm) => {
    const lang = $(elm).find('[itemprop="programmingLanguage"]');
    const langText = lang.length === 0 ? '' : ` 【${lang.text().replace(/\s/g, '')}】`;
    const linkText = `[${$(elm).find('h3 a').text().replace(/\s/g, '')}](https://github.com${$(elm).find('h3 a').attr('href')})`;
    md.push(`${i + 1}. ${linkText} ${langText}`);
  });
  md.push('');
  writeFileSync(path.resolve(__dirname, '../archives/', `${date}.md`), md.join('\n'), 'utf-8');
});
