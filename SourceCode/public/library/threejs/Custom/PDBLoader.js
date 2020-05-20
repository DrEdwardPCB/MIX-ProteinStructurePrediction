class PDBLoader {
    parse = (pdbfile) => {
        var parseResult;

        var rawText = pdbfile.split('\n').map(e => { return e.split(' ').filter(f => f != '') })
        //registerhelix and sheet position
        var ATOM = rawText.filter(e => { return e[0] == ATOM }).map(e => {
            return {
                residue: e[3],
                residuePosition: e[5],
                type: e[2],
                chain: e[4],
                x: e[6],
                y: e[7],
                z: e[8],
                atom: e[11]
            }
        })
        var HELIX = rawText.filter(e => { return e[0] == 'HELIX' }).map(e => {
            return {
                startChain: e[4],
                startResidue: e[3],
                startResiduePosition: e[5],
                endChain: e[7],
                endResidue: e[6],
                endResiduePosition: e[8]

            }
        })
        var SHEET = rawText.filter(e => { return e[0] == 'SHEET' }).map(e => {
            return {
                startChain: e[5],
                startResidue: e[4],
                startResiduePosition: e[6],
                endChain: e[8],
                endResidue: e[7],
                endResiduePosition: e[9]

            }
        })
        var TURN = rawText.filter(e => { return e[0] == 'SHEET' }).map(e => {
            return {
                startChain: e[4],
                startResidue: e[3],
                startResiduePosition: e[5],
                endChain: e[7],
                endResidue: e[6],
                endResiduePosition: e[8]

            }
        })
        var ATOM = rawText.filter(e => { return e[0] == 'ATOM' }).map(e => {
            var atom = {
                residue: e[3],
                residuePosition: parseInt(e[5]),
                type: e[2],
                chain: e[4],
                x: parseFloat(e[6]),
                y: parseFloat(e[7]),
                z: parseFloat(e[8]),
                atom: e[11]
            }
            for (var i = 0; i < HELIX.length; i++) {
                if(atom.chain==HELIX[i].startChain||atom.chain==HELIX[i].endChain){
                    if(atom.residuePosition>=parseInt(HELIX[i].startResiduePosition)&&atom.residuePosition<=parseInt(HELIX[i].endResiduePosition)){
                        atom.ss='a'
                        break;
                    }
                }
            }
            for (var i = 0; i < SHEET.length; i++) {
                if(atom.chain==SHEET[i].startChain||atom.chain==SHEET[i].endChain){
                    if(atom.residuePosition>=parseInt(SHEET[i].startResiduePosition)&&atom.residuePosition<=parseInt(SHEET[i].endResiduePosition)){
                        atom.ss='b'
                        break;
                    }
                }
            }
            for (var i = 0; i < TURN.length; i++) {
                if(atom.chain==TURN[i].startChain||atom.chain==TURN[i].endChain){
                    if(atom.residuePosition>=parseInt(TURN[i].startResiduePosition)&&atom.residuePosition<=parseInt(TURN[i].endResiduePosition)){
                        atom.ss='t'
                        break;
                    }
                }
            }
            return atom
        })

        parseResult=ATOM
        //console.log(ATOM)
        return parseResult
    }
}