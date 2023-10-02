import { exec } from 'child_process';
import { promisify } from 'util';

const processExec = promisify(exec);

const excludedShortContributors = [
  "andrewbotz",
  "Anthony Burchell",
  "bhardie",
  "Blake Wilson",
  "Brandon DuRette",
  "Chris Wiegman",
  "Clay Griffiths",
  "dependabot[bot]",
  "Diego Gallardo",
  "Fran Agulto",
  "github-actions[bot]",
  "Jason Bahl",
  "Jason Konen",
  "Joe Fusco",
  "John Parris",
  "Jordan Maslyn",
  "Joseph Fusco",
  "Kellen Mace",
  "Kevin W. Hoffman",
  "Mark Kelnar",
  "Matt Landers",
  "Matthew Wright",
  "Nick Cernis",
  "Teresa Gobble",
  "theodesp",
  "Theofanis Despoudis",
  "Will Johnston ",
  "William Johnston",
  "wpe-jenkins-github-admin",
  "wpengine.com"
];

const publicRepos = [
  'https://github.com/wpengine/wp-graphql-content-blocks.git',
  'https://github.com/wpengine/faustjs.git',
  'https://github.com/wpengine/atlas-blueprint-portfolio.git',
  'https://github.com/wpengine/faust-scaffold.git',
  'https://github.com/wpengine/faust-scaffold-ts.git',
  'https://github.com/wpengine/atlas-content-modeler.git',
];

async function getRepoLogs() {
  let repoStats = {
    lastMonth: '',
    allTime: ''
  };

  for (const repo of publicRepos) {

    let commands = [
      {
        command: 'git clone ' +
          repo +
          ' repo'
      },
      {
        name: "lastMonth",
        command: 'cd repo; git shortlog -se --no-merges --since="28 days ago" < /dev/tty'
      },
      {
        name: "allTime",
        command: 'cd repo; git shortlog -se --no-merges < /dev/tty'
      },
      {
        command: 'rm -rf repo'
      },
    ]

    for (const command of commands) {
      let output = await runCommand(command.command);

      if (command.name == 'lastMonth') {
        repoStats.lastMonth += output
      }

      if (command.name == 'allTime') {
        repoStats.allTime += output
      }
    }
  }

  return repoStats;
}

async function runCommand(command) {
  const { stdout } = await processExec(command);

  return stdout
}

export async function getStats() {
  let contributions = await getRepoLogs();

  let totalContributions = {
    allTime: {},
    lastMonth: {}
  };

  totalContributions.allTime = await crunchContributions(contributions.allTime)
  totalContributions.lastMonth = await crunchContributions(contributions.lastMonth)

  return totalContributions;
}

async function crunchContributions(contributions) {
  let stats = {
    individuals: [],
    totals: {
      contributors: 0,
      contributions: 0,
    }
  }

  contributions.split('\n').forEach((contribution) => {
    let contributor = contribution.trim().split('\t');

    if (contributor.length == 2) {
      let stat = {};
      stat.count = parseInt(contributor[0]);
      stat.user = contributor[1];

      let goodUser = true;

      excludedShortContributors.forEach((excludedContributor) => {
        if (stat.user.includes(excludedContributor)) {
          goodUser = false;
        }
      });

      if (goodUser) {
        stats.totals.contributors++;
        stats.totals.contributions += stat.count;
        stats.individuals.push(stat);
      }
    }
  });

  return stats
}
