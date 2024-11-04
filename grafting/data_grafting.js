/** @param {NS} ns */


const FIX_VIRUS = ["violet Congruity Implant"]

const HACK_AUGMENTATIONS = [
  "Cranial Signal Processors - Gen I",
  "Artificial Synaptic Potentiation",
  "CRTX42-AA Gene Modification",
  "Cranial Signal Processors - Gen II",
  "Embedded Netburner Module",
  "DataJack",
  "Cranial Signal Processors - Gen III",
  "The Black Hand",
  "Cranial Signal Processors - Gen IV",
  "Enhanced Myelin Sheathing",
  "Neuronal Densification",
  "nextSENS Gene Modification",
  "Cranial Signal Processors - Gen V",
  "Embedded Netburner Module Core Implant",
  "HyperSight Corneal Implant",
  "OmniTek InfoLoad",
  "Artificial Bio-neural Network Implant",
  "Neuralstimulator",
  "PC Direct-Neural Interface",
  "Xanipher",
  "BitRunners Neurolink"
]

export function get_hack_augmentations() {
  return Array.prototype.concat(FIX_VIRUS, HACK_AUGMENTATIONS)
}

export function get_graftable_augmentations(ns) {
  return ns.grafting.getGraftableAugmentations()
}

export async function main(ns) {
  // ns.tprint("graftable: ", get_graftable_augmentations(ns))
  // ns.tprint("")
  ns.tprint("hack: ", get_hack_augmentations(ns))
  ns.tprint("")
}