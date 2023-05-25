const fakeFnAll = jest.fn(() => []);
const fakeFnGet = jest.fn(() => []);
const fakeFnFind = jest.fn(() => {});
const fakeFnFindIn = jest.fn(() => {});
const fakeFnUpdate = jest.fn(() => {});
const fakeFnFirst = jest.fn(() => {});

export class BaseModel {
	constructor(props = {}) {
		for (const key in props) {
			this[key] = props[key];
		}
	}

	static all = fakeFnAll;
	static find = fakeFnFind;
	static findIn = fakeFnFindIn;
	static update = fakeFnUpdate;

	static query() {
		return {
			with: () => this.query(),
			where: () => this.query(),
			whereIn: () => this.query(),
			whereId: () => this.query(),
			whereInId: () => this.query(),
			orderBy: () => this.query(),
			first: fakeFnFirst,
			get: fakeFnGet,
		};
	}

	static api() {
		return {
			//
		};
	}
}

export default BaseModel;
