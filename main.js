// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ["A", "T", "C", "G"];
    return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum,
        dna,
        mutate() {
            let randBase = returnRandBase();
            // choose random index
            const index = Math.floor(Math.random() * this.dna.length);
            const chosenBase = this.dna[index];
            // if the bases are the same then choose another one until they are not
            while (randBase === chosenBase) {
                randBase = returnRandBase();
            }
            // change the base
            this.dna[index] = randBase;
            return this.dna;
        },
        compareDNA(pAequorObj) {
            let givenDNA = pAequorObj.dna;
            let matches = 0;
            // go through each DNA sequence and count how many bases match
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === givenDNA[i]) {
                    matches += 1;
                }
            }
            const percentage = (matches / this.dna.length) * 100;
            return percentage;
        },
        willLikelySurvive() {
            // get the number of bases that are C or G
            const CG = this.dna.filter((base) => base === "C" || base === "G");
            // work out the percentage of DNA that is C or G
            const percentageCG = (CG.length / this.dna.length) * 100;
            console.log(percentageCG);
            if (percentageCG >= 60) {
                return true;
            }
            return false;
        },
        complementStrand() {
            const complementStrand = [];
            this.dna.forEach((base) => {
                switch (base) {
                    case "C":
                        complementStrand.push("G");
                        break;
                    case "G":
                        complementStrand.push("C");
                        break;
                    case "A":
                        complementStrand.push("T");
                        break;
                    case "T":
                        complementStrand.push("A");
                        break;
                }
            });
            console.log(complementStrand);
        },
    };
};

const createArmy = (target) => {
    const pAequorArmy = [];
    for (let i = 1; i < target + 1; i++) {
        let dna = mockUpStrand();
        pAequorArmy.push(pAequorFactory(i, dna));
    }
    return pAequorArmy;
};

const pAequorArmy = createArmy(5);

const findClosestMatch = (pAequorArmy) => {
    // go through the Army
    let highestPercent = 0;
    let specimenNum1;
    let specimenNum2;
    for (let member of pAequorArmy) {
        for (let member2 of pAequorArmy) {
            // compare the 2, ensuring we don't compare the same one.
            if (member !== member2) {
                let percentage = member.compareDNA(member2);
                // store the highest %
                if (percentage > highestPercent) {
                    highestPercent = percentage;
                    specimenNum1 = member.specimenNum;
                    specimenNum2 = member2.specimenNum;
                }
            }
        }
    }
    console.log(
        `The most closely related is Specimen number: ${specimenNum1} and ${specimenNum2} with ${highestPercent}% similar DNA`
    );
};

findClosestMatch(pAequorArmy);
