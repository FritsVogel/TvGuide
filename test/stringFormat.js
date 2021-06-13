var expect = require("chai").expect;
var stringFormat = require("../utility/stringFormat");

//@todo quickly checked, but didn't see any data provider features in chai to separate test data from test logic - could choose to rewrite input and expected values into an array though

describe("String formatting", function() {
    describe("Formatting timestamp to time", function() {
        it("Converts valid timestamps", function() {
            expect(stringFormat.time(1610064000000)).to.equal('01:00:00');
            expect(stringFormat.time(1610233500000)).to.equal('00:05:00');
            expect(stringFormat.time(1623520754000)).to.equal('19:59:14');
        });
        it("Returns Invalid Date on invalid timestamps", function() {
            expect(stringFormat.time()).to.equal('Invalid Date');
            expect(stringFormat.time('Bertje')).to.equal('Invalid Date');
            expect(stringFormat.time('Henk')).to.equal('Invalid Date');
        });
    });
    describe("Formatting timestamp to date", function() {
        it("Converts valid timestamps", function() {
            expect(stringFormat.date(1610064000000)).to.equal('vr 8 jan. 2021');
            expect(stringFormat.date(1610233500000)).to.equal('zo 10 jan. 2021');
            expect(stringFormat.date(1623520754000)).to.equal('za 12 jun. 2021');
        });
        it("Returns Invalid Date on invalid timestamps", function() {
            expect(stringFormat.date()).to.equal('Invalid Date');
            expect(stringFormat.date('Bertje')).to.equal('Invalid Date');
            expect(stringFormat.date('Henk')).to.equal('Invalid Date');
        });
    });
    describe("Formatting categories to string (comma separated list of titles)", function() {
        it("Converts valid categories", function() {
            expect(stringFormat.categories([{
                id: 'lgi-nl-prod-master:genre-22',
                title: 'Nieuws',
                scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
            },{
                id: 'lgi-nl-prod-master:genre-22_1',
                title: "Actualiteitenprogramma's",
                scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
            }])).to.equal("Nieuws, Actualiteitenprogramma's");
            expect(stringFormat.categories([{
                id: 'lgi-nl-prod-master:genre-22',
                title: 'Nieuws',
                scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
            }])).to.equal('Nieuws');
        });
        it("Converts invalid categories", function() {
            expect(stringFormat.categories([{
                id: 'lgi-nl-prod-master:genre-22',
                titleMissing: 'Nieuws',
                scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
            },{
                id: 'lgi-nl-prod-master:genre-22_1',
                title: "Actualiteitenprogramma's",
                scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
            }])).to.equal("Actualiteitenprogramma's");
            expect(stringFormat.categories([{
                id: 'lgi-nl-prod-master:genre-22',
                titleMissing: 'Nieuws',
                scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
            }])).to.equal('');
            expect(stringFormat.categories()).to.equal('');
        });
    });
    describe("Formatting schedules to string (comma separated list of titles)", function() {
        it("Converts valid schedules", function() {
            expect(stringFormat.schedule({
                s: 1610058900000,
                e: 1610060400000,
                p: {
                    title: 'NOS Journaal',
                    description: 'Met het laatste nieuws, gebeurtenissen van nationaal en internationaal belang en de weersverwachting. En op NPO Nieuws met gebarentolk.',
                    categories: [
                        {
                            id: 'lgi-nl-prod-master:genre-22',
                            title: 'Nieuws',
                            scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
                        }
                     ],
                    year: 2020
                }
            })).to.equal("do 7 jan. 2021 23:35:00 - vr 8 jan. 2021 00:00:00 / NOS Journaal (Nieuws / 2020)\nMet het laatste nieuws, gebeurtenissen van nationaal en internationaal belang en de weersverwachting. En op NPO Nieuws met gebarentolk.\n\n--\n");
            expect(stringFormat.schedule({
                s: 1610059500000,
                e: 1610064000000,
                p: {
                    title: 'Jinek',
                    description: 'Dagelijkse talkshow waarin Eva Jinek met de hoofdrolspelers uit de actualiteit het gesprek van de dag voert.',
                    categories: [
                        {
                            id: 'lgi-nl-prod-master:genre-28',
                            title: 'Talkshow',
                            scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
                        }
                    ],
                    year: 2021
                }
            })).to.equal("do 7 jan. 2021 23:45:00 - vr 8 jan. 2021 01:00:00 / Jinek (Talkshow / 2021)\nDagelijkse talkshow waarin Eva Jinek met de hoofdrolspelers uit de actualiteit het gesprek van de dag voert.\n\n--\n");
        });
        it("Converts invalid schedules to strings with potential 'Invalid Date' and 'undefined' errors", function() {
            expect(stringFormat.schedule({
                sMissing: 1610058900000,
                eMissing: 1610060400000,
                p: {
                    titleMissing: 'NOS Journaal',
                    descriptionMissing: 'Met het laatste nieuws, gebeurtenissen van nationaal en internationaal belang en de weersverwachting. En op NPO Nieuws met gebarentolk.',
                    categories: [
                        {
                            id: 'lgi-nl-prod-master:genre-22',
                            titleMissing: 'Nieuws',
                            scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
                        }
                    ],
                    yearMissing: 2020
                }
            })).to.equal("Invalid Date Invalid Date - Invalid Date Invalid Date /  ( / )\n\n\n--\n");
            expect(stringFormat.schedule({
                s: 1610059500000,
                e: 1610064000000,
                p: {
                    title: 'Jinek',
                    description: 'Dagelijkse talkshow waarin Eva Jinek met de hoofdrolspelers uit de actualiteit het gesprek van de dag voert.',
                    categoriesMissing: [
                        {
                            id: 'lgi-nl-prod-master:genre-28',
                            title: 'Talkshow',
                            scheme: 'urn:libertyglobal:metadata:cs:ContentCS:2014_1'
                        }
                    ],
                    year: 2021
                }
            })).to.equal("do 7 jan. 2021 23:45:00 - vr 8 jan. 2021 01:00:00 / Jinek ( / 2021)\nDagelijkse talkshow waarin Eva Jinek met de hoofdrolspelers uit de actualiteit het gesprek van de dag voert.\n\n--\n");
            expect(stringFormat.schedule()).to.equal('');
        });
    });
    describe("Constructing filter array string", function () {
        it("Converts from valid titles and array values", function () {
            expect(stringFormat.filterArrayString('title',['NPO 1 HD', 'RTL 4 HD'])).to.equal('[{title: "NPO 1 HD"},{title: "RTL 4 HD"}]');
            expect(stringFormat.filterArrayString('d',[20210108, 20210109])).to.equal('[{d: 20210108},{d: 20210109}]');
            expect(stringFormat.filterArrayString('hoera',['Bertje', 'Henk'])).to.equal('[{hoera: "Bertje"},{hoera: "Henk"}]');
        });
        it("Converts from invalid titles or array values", function () {
            expect(stringFormat.filterArrayString).to.throw(TypeError, 'fieldName should be a string, values should be an object');
            expect(stringFormat.filterArrayString, 'Bertje').to.throw(TypeError, 'fieldName should be a string, values should be an object');
            expect(stringFormat.filterArrayString, 'Henk', 123).to.throw(TypeError, 'fieldName should be a string, values should be an object');
        });
    });
});
