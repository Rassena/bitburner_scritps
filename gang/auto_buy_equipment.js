/** @param {NS} ns */

const MIN_MONEY_GAIN = 1e6

export async function auto_buy_equipment(ns) {
  while (true) {
    await ns.sleep(await ns.gang.nextUpdate())
    let gang_info = ns.gang.getGangInformation()
    let equipment_names = ns.gang.getEquipmentNames()
    let gang_mebers = ns.gang.getMemberNames()
    for (let i = 0; i < gang_mebers.length; i++) {
      for (let j = 0; j < equipment_names.length; j++) {
        let equipment_type = ns.gang.getEquipmentType(equipment_names[j])
        if (equipment_type == "Augmentation") { ns.gang.purchaseEquipment(gang_mebers[i], equipment_names[j]) }
        else {
          if (gang_info.moneyGainRate >= MIN_MONEY_GAIN) { ns.gang.purchaseEquipment(gang_mebers[i], equipment_names[j]) }
        }
      }
    }
  }
}

export async function main(ns) {
  return auto_buy_equipment(ns)
}