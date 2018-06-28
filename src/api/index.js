import axios from 'axios';
import cheerio from 'cheerio-without-node-native';

export const getTrends = (period, language) => {
  return new Promise((resolve, reject) => {
    if (typeof period === 'undefined') {
      period = 'daily';
    }

    if (typeof language === 'undefined') {
      language = '';
    }

    return axios
      .get(
        'https://github.com/trending/' +
          encodeURIComponent(language) +
          '?since=' +
          period
      )
      .then(response => {
        const $ = cheerio.load(response.data);
        const repos = [];

        $('li', 'ol.repo-list').each((index, repo) => {
          const title = $(repo)
            .find('h3')
            .text()
            .trim();

          const starLink = '/' + title.replace(/ /g, '') + '/stargazers';
          const forkLink = '/' + title.replace(/ /g, '') + '/network';

          const author = title.split(' / ')[0];
          const name = title.split(' / ')[1];
          const href = 'https://github.com/' + title.replace(/ /g, '');
          const description =
            $(repo)
              .find('p', '.py-1')
              .text()
              .trim() || null;
          const lang = $(repo)
            .find('[itemprop=programmingLanguage]')
            .text()
            .trim();
          let languageColor = '';
          const parseColor =
            $(repo)
              .find('[class="repo-language-color ml-0"]')
              .attr('style') || '';
          parseColor !== ''
            ? (languageColor = parseColor.split(/(#.+)(?:;)/)[1])
            : (languageColor = '#fff');
          const stars = parseInt(
            $(repo)
              .find('[href="' + starLink + '"]')
              .text()
              .trim()
              .replace(',', '') || 0,
            10
          );
          const forks = parseInt(
            $(repo)
              .find('[href="' + forkLink + '"]')
              .text()
              .trim()
              .replace(',', '') || 0,
            10
          );

          repos.push({
            author: author,
            name: name,
            href: href,
            description: description,
            language: {
              name: lang,
              color: languageColor
            },
            stars: stars,
            forks: forks
          });
        });
        resolve(repos);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const getTopics = nextPage => {
  return new Promise((resolve, reject) => {
    if (nextPage === 'nextPage') {
      nextPage = '?utf8=✓&after=Y3Vyc29yOnYyOpKjbmltzSQr';
    } else {
      nextPage = '';
    }
    return axios
      .get('https://github.com/topics/' + nextPage)
      .then(response => {
        const $ = cheerio.load(response.data);
        const topics = [];
        $('div');
        $('li[class="py-4 border-bottom"]', 'ul[class=list-style-none]').each(
          (index, topic) => {
            const title = $(topic)
              .find('.f3')
              .text()
              .trim();

            const href = $(topic)
              .find('a')
              .attr('href');

            const description = $(topic)
              .find('.f5')
              .text()
              .trim();

            const tagOrImg = $(topic)
              .find('a')
              .children()
              .first()[0].name;
            let imgTopic = '#';
            tagOrImg === 'img'
              ? (imgTopic = $(topic)
                  .find('a')
                  .children()
                  .first()
                  .attr('src'))
              : '';
            topics.push({
              title: title,
              url: 'https://github.com' + href,
              description: description,
              img: imgTopic
            });
          }
        );

        resolve(topics);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const getTopicOverview = url => {
  return new Promise((resolve, reject) => {
    return axios
      .get(url)
      .then(response => {
        const $ = cheerio.load(response.data);
        const topics = [];
        $('div');
        $('article', 'div[class="col-md-8"]').each((index, topic) => {
          const topicCaption = $(topic)
            .find('.f3')
            .text()
            .trim();
          const starLink = '/' + topicCaption.replace(/ /g, '') + '/stargazers';

          const arr = topicCaption.split(' / ');

          const author = arr[0];
          const name = arr[1];

          const href = $(topic)
            .find('a')
            .attr('href');

          const stars =
            $(topic)
              .find('[href="' + starLink + '"]')
              .text()
              .trim()
              .replace(',', '') || 0;

          const description = $(topic)
            .find('div[class="text-gray mb-3 ws-normal"]')
            .text()
            .trim();

          const language = $(topic)
            .find('[itemprop=programmingLanguage]')
            .text()
            .trim();

          let languageColor = '#fff';
          const parseColor =
            $(topic)
              .find('[class="repo-language-color ml-0"]')
              .attr('style') || '';
          parseColor !== ''
            ? parseColor.split(/(#.+)(?:;)/)[1] !== undefined
              ? (languageColor = parseColor.split(/(#.+)(?:;)/)[1])
              : ''
            : '';

          topics.push({
            author: author,
            name: name,
            url: 'https://github.com' + href,
            stars: stars,
            description: description,
            language: {
              name: language,
              color: languageColor
            }
          });
        });

        resolve(topics);
      })
      .catch(err => {
        reject(err);
      });
  });
};
