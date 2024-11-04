/** @param {NS} ns */

import { fix_gang_naming } from "gang/fix_naming.js";

const HACK_MIN = 300
const STR_MIN = 900
const DEF_MIN = 900
const DEX_MIN = 900
const AGI_MIN = 900
const CHA_MIN = 300

const HACK_ASCEND_MIN = 30
const STR_ASCEND_MIN = 50
const DEF_ASCEND_MIN = 50
const DEX_ASCEND_MIN = 50
const AGI_ASCEND_MIN = 50
const CHA_ASCEND_MIN = 30

const HACK_ASCENDING_MIN = 2
const STR_ASCENDING_MIN = 2
const DEF_ASCENDING_MIN = 2
const DEX_ASCENDING_MIN = 2
const AGI_ASCENDING_MIN = 2
const CHA_ASCENDING_MIN = 2

export async function main(ns) {
  while (true) {
    await ns.sleep(await ns.gang.nextUpdate())
    await fix_gang_naming(ns)
    recruit_new_member(ns)
    decide_tasks(ns)
  }
}

export function decide_tasks(ns) {
  let gang_members = ns.gang.getMemberNames()
  for (let i = 0; i < gang_members.length; i++) {
    decide_task(ns, gang_members[i])
  }
}

export function decide_task(ns, gang_member_name) {

  if (!is_asc_mult_min(ns, gang_member_name)) { return to_ascend(ns, gang_member_name) }
  if (!is_stats_min(ns, gang_member_name)) { return to_learn(ns, gang_member_name) }

  return to_work(ns, gang_member_name)
}

export function to_work(ns, gang_member_name) {
  return ns.gang.setMemberTask(gang_member_name, "Traffick Illegal Arms")
}

export function to_learn(ns, gang_member_name) {

  if (!is_combat_stats_min(ns, gang_member_name)) {
    return ns.gang.setMemberTask(gang_member_name, "Train Combat")
  }
  if (!is_cha_stats_min(ns, gang_member_name)) {
    return ns.gang.setMemberTask(gang_member_name, "Train Charisma")
  }
  if (!is_hack_stats_min(ns, gang_member_name)) {
    return ns.gang.setMemberTask(gang_member_name, "Train Hacking")
  }
}

export function to_ascend(ns, gang_member_name) {

  if (!is_combat_asc_mult_min(ns, gang_member_name)) {
    if (!is_combat_ascending_min(ns, gang_member_name)) {
      return ns.gang.setMemberTask(gang_member_name, "Train Combat")
    }
  }
  if (!is_cha_asc_mult_min(ns, gang_member_name)) {
    if (!is_cha_ascending_min(ns, gang_member_name)) {
      return ns.gang.setMemberTask(gang_member_name, "Train Charisma")
    }
  }
  if (!is_hack_asc_mult_min(ns, gang_member_name)) {
    if (!is_hack_ascending_min(ns, gang_member_name)) {
      return ns.gang.setMemberTask(gang_member_name, "Train Hacking")
    }
  }
  return ns.gang.ascendMember(gang_member_name)
}

function recruit_new_member(ns) {
  let gang_members = ns.gang.getMemberNames()
  if (ns.gang.canRecruitMember()) { ns.gang.recruitMember("New_Member-" + gang_members.length) }
}

function is_combat_asc_mult_min(ns, gang_member_name) {
  let gang_member_data = ns.gang.getMemberInformation(gang_member_name)
  return (gang_member_data.str_asc_mult > STR_ASCEND_MIN
    && gang_member_data.def_asc_mult > DEF_ASCEND_MIN
    && gang_member_data.dex_asc_mult > DEX_ASCEND_MIN
    && gang_member_data.agi_asc_mult > AGI_ASCEND_MIN)
}
function is_hack_asc_mult_min(ns, gang_member_name) {
  let gang_member_data = ns.gang.getMemberInformation(gang_member_name)
  return (gang_member_data.hack_asc_mult > HACK_ASCEND_MIN)
}
function is_cha_asc_mult_min(ns, gang_member_name) {
  let gang_member_data = ns.gang.getMemberInformation(gang_member_name)
  return (gang_member_data.cha_asc_mult > CHA_ASCEND_MIN)
}
function is_asc_mult_min(ns, gang_member_name) {
  return (is_combat_asc_mult_min(ns, gang_member_name)
    && is_hack_asc_mult_min(ns, gang_member_name)
    && is_cha_asc_mult_min(ns, gang_member_name))
}

function is_combat_ascending_min(ns, gang_member_name) {
  let ascend_data = ns.gang.getAscensionResult(gang_member_name)
  if (ascend_data == undefined) { return false }
  return (ascend_data.str > STR_ASCENDING_MIN
    && ascend_data.def > DEF_ASCENDING_MIN
    && ascend_data.dex > DEX_ASCENDING_MIN
    && ascend_data.agi > AGI_ASCENDING_MIN)
}
function is_cha_ascending_min(ns, gang_member_name) {
  let ascend_data = ns.gang.getAscensionResult(gang_member_name)
  if (ascend_data == undefined) { return false }
  return (ascend_data.cha > CHA_ASCENDING_MIN)
}
function is_hack_ascending_min(ns, gang_member_name) {
  let ascend_data = ns.gang.getAscensionResult(gang_member_name)
  if (ascend_data == undefined) { return false }
  return (ascend_data.hack > HACK_ASCENDING_MIN)
}

function is_combat_stats_min(ns, gang_member_name) {
  let gang_member_data = ns.gang.getMemberInformation(gang_member_name)
  return (gang_member_data.str > STR_MIN
    && gang_member_data.def > DEF_MIN
    && gang_member_data.dex > DEX_MIN
    && gang_member_data.agi > AGI_MIN)
}
function is_cha_stats_min(ns, gang_member_name) {
  let gang_member_data = ns.gang.getMemberInformation(gang_member_name)
  return (gang_member_data.cha > CHA_MIN)
}
function is_hack_stats_min(ns, gang_member_name) {
  let gang_member_data = ns.gang.getMemberInformation(gang_member_name)
  return (gang_member_data.hack > HACK_MIN)
}
function is_stats_min(ns, gang_member_name) {
  return (is_combat_stats_min(ns, gang_member_name)
    && is_cha_stats_min(ns, gang_member_name)
    && is_hack_stats_min(ns, gang_member_name))
}
