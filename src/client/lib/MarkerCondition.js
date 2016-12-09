import _ from 'lodash';

let sideRestoration = (marker, side) => {
	return 0.05 * _.get(marker, 'sides.' + side + '.conditions.structuralDisintegration')
		+ 0.15 * _.get(marker, 'sides.' + side + '.conditions.surfaceCracking')
		+ 0.25 * _.get(marker, 'sides.' + side + '.conditions.discoloration')
		+ 0.25 * _.get(marker, 'sides.' + side + '.conditions.growthAround')
		+ 0.30 * _.get(marker, 'sides.' + side + '.conditions.growthOn');
};

let sideCondition = (marker, side) => {
	return 0.4 * _.get(marker, 'sides.' + side + '.conditions.structuralDisintegration')
		+ 0.2 * _.get(marker, 'sides.' + side + '.conditions.surfaceCracking')
		+ 0.2 * _.get(marker, 'sides.' + side + '.conditions.discoloration')
		+ 0.15 * _.get(marker, 'sides.' + side + '.conditions.growthAround')
		+ 0.05 * _.get(marker, 'sides.' + side + '.conditions.growthOn');
};

let calculateGrade = (func, marker) => {
    let sum = 0;
    let count = 0;

    [1, 2, 3, 4].forEach((side) => {
        let condition = func(marker, side);

        if (condition) {
            sum += condition;
            count += 1;
        }
    });

    let result = sum / count;
    return Math.round(result * 100) / 100;
};

module.exports = {
    SideCondition: sideCondition,
    SideRestoration: sideRestoration,
    OverallCondition: calculateGrade.bind(null, sideCondition),
    RestorationPotential: calculateGrade.bind(null, sideRestoration)
};