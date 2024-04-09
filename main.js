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

const pAequorFactory = (speciminNum, dna) => {
    return {
        speciminNum,
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
            console.log(`The index of the base that was changed is: ${index}`);
            return this.dna;
        },
        compareDNA(pAequorObj) {
            let givenDNA = pAequorObj.dna;
            let matches = 0;
            // go through each DNA sequence and count how many bases match
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === givenDNA[i]) {
                    matches += 1;
                    console.log(
                        `Match found at index: ${i} where base is ${dna[i]}`
                    );
                }
            }
            console.log(`${(matches / this.dna.length) * 100}% in common`);
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
    for (let i = 0; i < target; i++) {
        let dna = mockUpStrand();
        pAequorArmy.push(pAequorFactory(i, dna));
    }
    console.log(pAequorArmy);
};

createArmy(30);

const findClosestMatch = () => {};
