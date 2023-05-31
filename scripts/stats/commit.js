import { exec } from 'child_process';
import { promisify } from 'util';

const processExec = promisify(exec);

const excludedFullContributors = [
  'Theofanis Despoudis <328805+theodesp@users.noreply.github.com>',
  'Teresa Gobble <teresagobble@gmail.com>',
  'Joe Fusco <josephfusco@users.noreply.github.com>',
  'Blake Wilson <blake.wilson@wpengine.com>',
  'John Parris <john.parris@wpengine.com>',
  'Blake Wilson <blake@blake.id>',
  'John Parris <public@johnparris.com>',
];

const excludedShortContributors = ['github-actions[bot]', 'Chris Wiegman'];

const publicRepos = [
  'https://github.com/wpengine/wp-graphql-content-blocks.git',
  'https://github.com/wpengine/faustjs.git',
];

async function getRepoStats() {
  let repoStats = '';

  for (const repo of publicRepos) {
    const { stdout } = await processExec(
      'git clone ' +
        repo +
        ' repo; cd repo; git shortlog -se --no-merges --since="28 days ago" < /dev/tty; cd ..; rm -rf repo',
    );

    repoStats += stdout;
  }

  return repoStats;
}

async function getContributorStats() {
  let contributions = await getRepoStats();

  let totalContributions = {
    contributors: [],
    totals: {
      contributors: 0,
      contributions: 0,
    },
  };

  contributions.split('\n').forEach((contribution) => {
    let contributor = contribution.trim().split('\t');

    if (contributor.length == 2) {
      let stat = {};
      stat.count = parseInt(contributor[0]);
      stat.user = contributor[1];

      let goodUser = true;

      if (excludedFullContributors.includes(stat.user)) {
        goodUser = false;
      }

      excludedShortContributors.forEach((excludedContributor) => {
        if (stat.user.includes(excludedContributor)) {
          goodUser = false;
        }
      });

      if (goodUser) {
        totalContributions.totals.contributors++;
        totalContributions.totals.contributions += stat.count;
        totalContributions.contributors.push(stat);
      }
    }
  });

  return totalContributions;
}

(async () => {
  let stats = await getContributorStats();

  console.log(stats);
})();
