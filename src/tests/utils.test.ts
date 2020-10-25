import Utils from "../utils";

describe('buildQueryArgs', function () {
    it('returns empty string for empty arguments', function () {
        let result = Utils.buildQueryArgs([]);
        expect(result).toBe("");
    });
});
