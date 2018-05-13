import React from 'react'
import Map from './map.jsx'

export default () => (
  <div>
    <h2>Hitta till bröllopet</h2>
    <p>
      Vi kommer att fira vårt bröllop i Hälleforsnäs, en gammal bruksort i
      närheten av Flen och Katrineholm. Hit tar ni er enklast med bil eller tåg.
    </p>
    <p>
      Den korta sträckan från boendet på Granhedsgården till vigseln på Sjöviken
      promenerar ni till fots - vi ser till att alla kommer till festen och
      sedan tillbaka till Granhedsgården på natten.
    </p>
    <h3>Tåg</h3>
    <p>
      SJ kör hela vägen till Hälleforsnäs station, med byte i Eskilstuna för den
      som kommer från Stockholm. Från Hälleforsnäs till Granhedsgården och
      Sjöviken är det ungefär 6 km - om ni kommer med tåg, berätta det för oss i
      förväg, så kan vi försöka ordna skjuts den sträckan!
    </p>
    <h3> Bil</h3>
    <p>
      Att köra från Stockholm till Hälleforsnäs tar någonstans mellan 1,5 och 2
      timmar, beroende på trafikläget. Granhedsgården går att hitta på google
      maps. Precis innan ni kommer fram, om ni kommer från Hälleforsnäs-hållet,
      kör ni förbi ett stort rött hus; Sjöviken.
    </p>
    <Map />
  </div>
)
