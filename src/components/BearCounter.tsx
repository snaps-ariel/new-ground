'use client'

import useBearStore from "@/store/bearStore";
export default function BearCounter() {
    const {bears, increasePopulation, removeAllBears} = useBearStore()
    return(
    <section>
        <h1>{bears} around here ...</h1>
        <button onClick={() => increasePopulation(2)}>up</button>
        <button onClick={removeAllBears}>remove All Bears</button>
    </section>
    )
}