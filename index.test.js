const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        const band1 = await Band.create({
            name: 'Black Keys',
            genre: 'rock',
        })

        expect(band1.name).toBe("Black Keys");
    })

    test('can create a Musician', async () => {
        const musician1 = await Musician.create({
            name: 'Bob',
            instrument: 'guitar',
        })

        expect(musician1.name).toBe("Bob");
    })
})

describe("Band and Musician associations", () => {
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test("check association", async () => {
    
        const band1 = await Band.create({
            name: 'Black Keys',
            genre: 'rock',
        })
    
        const band2 = await Band.create({
            name: 'Coldplay',
            genre: 'pop',
        })
    
        const musician1 = await Musician.create({
            name: 'Mich',
            instrument: 'drums',
        })
    
        const musician2 = await Musician.create({
            name: 'Dave',
            instrument: 'guitar',
        })
    
        const musician3 = await Musician.create({
            name: 'Ana',
            instrument: 'piano',
        })
    
        await band1.addMusician(musician1)
        await band1.addMusician(musician2)
        await band2.addMusician(musician3)
    
        const bands = await Band.findAll()
    
        const bandMembers1 = await band1.getMusicians()
        const bandMembers2 = await band2.getMusicians()
        
        expect(bandMembers1.length).toBe(2)
        expect(bandMembers2.length).toBe(1)
    })
})

describe("Song models", () => {
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })
    
    test("can create a song", async () => {
    
        const song1 = await Song.create({
            name: 'Fever',
        })
    
        expect(song1.name).toBe("Fever")
    })

    test("Band and Song association check", async () => {
    
        const song2 = await Song.create({
            name: 'Fever',
        })

        const song3 = await Song.create({
            name: 'Lonely boy',
        })

        const band1 = await Band.create({
            name: 'Black Keys',
            genre: 'rock',
        })
    
        await band1.addSong(song2)
        await band1.addSong(song3)

        // const bands = await Band.findAll()

        const band1Songs = await band1.getSongs()

        expect(band1Songs.length).toBe(2)
    })
})

describe("Eager loading", () => {
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test("check association", async () => {
        const band1 = await Band.create({
            name: 'Black Keys',
            genre: 'rock',
        })
    
        const band2 = await Band.create({
            name: 'Coldplay',
            genre: 'pop',
        })
    
        const michMusician= await Musician.create({
            name: 'Mich',
            instrument: 'drums',
        })
    
        const daveMusician = await Musician.create({
            name: 'Dave',
            instrument: 'guitar',
        })
    
        const anaMusician = await Musician.create({
            name: 'Ana',
            instrument: 'piano',
        })


        await band1.addMusician(michMusician)
        await band1.addMusician(daveMusician)
        await band2.addMusician(anaMusician)


        const song2 = await Song.create({
            name: 'Fever',
        })

        const song3 = await Song.create({
            name: 'Lonely boy',
        })

        const band3 = await Band.create({
            name: 'Alt-j',
            genre: 'indie pop',
        })
    
        await band3.addSong(song2)
        await band3.addSong(song3)

        const musicians = await Band.findAll({ include: Musician });
        const songs = await Band.findAll({ include: Song });

        expect(musicians[0].musicians.length).toBe(2)
        expect(musicians[1].musicians.length).toBe(1)

        expect(songs[0].songs.length).toBe(0)
        expect(songs[2].songs.length).toBe(2)
    })
})