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
            let index = Math.floor(Math.random() * this.dna.length);
            let chosenBase = this.dna[index];
            while (randBase === chosenBase) {
                randBase = returnRandBase();
            }
            this.dna[index] = randBase;
            console.log(`The index of the base that was changed is: ${index}`);
            return this.dna;
        },
        compareDNA(pAequorObj) {
            let givenDNA = pAequorObj.dna;
            let matches = 0;

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
            const CG = this.dna.filter((base) => base === "C" || base === "G");
            const percentageCG = (CG.length / this.dna.length) * 100;
            console.log(percentageCG)
            if (percentageCG >= 60){
              return true
            }
            return false
        },
    };
};

// const dna = mockUpStrand();
// const dna2 = mockUpStrand();

// const pAequor = pAequorFactory(1, dna);
// const pAequor2 = pAequorFactory(2, dna2);

// console.log(pAequor.willLikelySurvive())
// // pAequor.mutate();
// // console.log(pAequor2.dna);
// // pAequor.compareDNA(pAequor2)


