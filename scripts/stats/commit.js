import { exec } from "child_process";

const excludedContributors = [
    'github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>',
    'Theofanis Despoudis <328805+theodesp@users.noreply.github.com>',
    'Teresa Gobble <teresagobble@gmail.com>',
    'Joe Fusco <josephfusco@users.noreply.github.com>',
    'Blake Wilson <blake.wilson@wpengine.com>' ,
]

exec('git shortlog -se --no-merges --since="28 days ago" < /dev/tty', {}, function (err, stdout, stderr) {

    let totalContributions = {
        'contributors': [],
        'totals': {
            'contributors': 0,
            'contributions': 0,
        }
    }

    arguments[1].split('\n').forEach(contributor => {
        let contributions = contributor.trim().split('\t')

        if (contributions.length == 2) {

            let contribution = {}
            contribution.count = parseInt(contributions[0])
            contribution.user = contributions[1]

            if (!excludedContributors.includes(contribution.user)) {
                totalContributions.totals.contributors++
                totalContributions.totals.contributions += contribution.count
                totalContributions.contributors.push(contribution)
            }
        }
    });

    console.log(totalContributions);
});
