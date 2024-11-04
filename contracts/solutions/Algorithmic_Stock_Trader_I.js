/** @param {NS} ns */

/** 
You are given the following array of stock prices (which are numbers)
where the i-th element represents the stock price on day i:

 126,27,193,196,163,99,138,4

 Determine the maximum possible profit you can earn using at most one transaction 
 (i.e. you can only buy and sell the stock once). If no profit can be made then the answer should be 0. 
 Note that you have to buy the stock before you can sell it. 
 */

let example = [ 126,27,193,196,163,99,138,4]

export function trade_stock(ns,data){
  let earning = 0
  for (let buy = 0 ; buy<data.length-1;buy++){
    for (let sell = buy +1; sell < data.length;sell++){
      // ns.tprint("buy: ",data[buy], " sell: ", data[sell], " earn: ",data[sell]-data[buy])
      if(data[sell]-data[buy]>earning){
        earning = data[sell] - data[buy]
      }
    }
  }
  return earning
}


export function Algorithmic_Stock_Trader_I(ns,data){
  return trade_stock(ns,data)
}


export async function main(ns) {
  ns.tprint(Algorithmic_Stock_Trader_I(ns,example))
}