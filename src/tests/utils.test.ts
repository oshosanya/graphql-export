import Utils from "../utils";

describe('buildQueryArgs', function () {
    it('returns empty string for empty arguments', function () {
        const result = Utils.buildQueryArgs([]);
        expect(result).toBe("");
    });
});
