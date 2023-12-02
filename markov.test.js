const markov = require('./markov');

describe("Test Markov Machine class", function () {
    test('should create instance of class with given text.', function() {
        let mm = new markov.MarkovMachine('the cat in the hat is in the hat');
        expect(mm).toBeInstanceOf(markov.MarkovMachine);
    })
    test('should create array of words from given text', function() {
        let mm = new markov.MarkovMachine('the cat in the hat is in the hat');
        expect(mm.words).toEqual(['the','cat','in','the','hat','is','in','the','hat']);
    })
    test('should create chains of potential words from given words.', function() {
        let mm = new markov.MarkovMachine('testing is testing and testing fun');
        let newMap = new Map();
        newMap.set('testing', ['is', 'and', 'fun']);
        newMap.set('is', ['testing']);
        newMap.set('and', ['testing']);
        newMap.set('fun', [null]);
        
        expect(mm.chains).toEqual(newMap);
    })
})