import _ from 'lodash';

let sideCondition = (marker, side) => {
	return 0.05 * _.get(marker, 'sides.' + side + '.conditions.structuralDisintegration')
		+ 0.15 * _.get(marker, 'sides.' + side + '.conditions.surfaceCracking')
		+ 0.25 * _.get(marker, 'sides.' + side + '.conditions.discoloration')
		+ 0.25 * _.get(marker, 'sides.' + side + '.conditions.growthAround')
		+ 0.30 * _.get(marker, 'sides.' + side + '.conditions.growthOn');
};

let sideRestoration = (marker, side) => {
	return 0.4 * _.get(marker, 'sides.' + side + '.conditions.structuralDisintegration')
		+ 0.2 * _.get(marker, 'sides.' + side + '.conditions.surfaceCracking')
		+ 0.2 * _.get(marker, 'sides.' + side + '.conditions.discoloration')
		+ 0.15 * _.get(marker, 'sides.' + side + '.conditions.growthAround')
		+ 0.05 * _.get(marker, 'sides.' + side + '.conditions.growthOn');
};

module.exports = {
    SideCondition: sideCondition,
    SideRestoration: sideRestoration,
    OverallCondition: (marker) => {
    	let result = _.sumBy([1, 2, 3, 4], (n) => {
    		return sideCondition(marker, n);
    	});

        return Math.round(result * 100) / 100;
    },
    RestorationPotential: (marker) => {
    	let result = _.sumBy([1, 2, 3, 4], (n) => {
    		return sideRestoration(marker, n);
    	});

        return Math.round(result * 100) / 100;
    }
};