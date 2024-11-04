/** @param {NS} ns */

let GAN_NAME_PREFIX = "Gang_Member-"

export function is_gang_names_correct(ns) {
  let gang_members = ns.gang.getMemberNames()
  for (let i = 0; i < gang_members.length; i++) {
    let correct_Gang_Member_name = GAN_NAME_PREFIX
    if (i < 10) { correct_Gang_Member_name += "0" }
    correct_Gang_Member_name += i
    if (gang_members[i] !== correct_Gang_Member_name) { return false }
  }
  return true
}

export async function fix_gang_naming(ns) {

  if (is_gang_names_correct(ns)) { return 0 }

  let gang_members = ns.gang.getMemberNames()
  for (let i = 0; i < gang_members.length; i++) {
    let temp_Gang_Member_name = "temp0-"
    if (i < 10) { temp_Gang_Member_name += "0" }
    temp_Gang_Member_name += i
    ns.gang.renameMember(gang_members[i], temp_Gang_Member_name)
  }

  await ns.sleep(await ns.gang.nextUpdate())

  gang_members = ns.gang.getMemberNames()
  for (let i = 0; i < gang_members.length; i++) {
    let correct_Gang_Member_name = GAN_NAME_PREFIX
    if (i < 10) { correct_Gang_Member_name += "0" }
    correct_Gang_Member_name += i
    ns.gang.renameMember(gang_members[i], correct_Gang_Member_name)
  }

}

export async function main(ns) {
  return await fix_gang_naming(ns)
}