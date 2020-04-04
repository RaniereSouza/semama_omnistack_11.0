import generateUniqueId from '../../src/utils/generateUniqueId';

describe('Generate Unique ID', () => {
    it('should generate an unique hexadecimal ID', () => {

        const id = generateUniqueId();

        expect(id).toHaveLength(8);
        expect(id).toMatch(/[0-9A-Fa-f]/);
    });
});