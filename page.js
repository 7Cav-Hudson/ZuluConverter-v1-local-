(() => {
  document.addEventListener('DOMContentLoaded', () => {
    // ------- Elements -------
    const timeInput   = document.getElementById('timeInput');
    const goBtn       = document.getElementById('go');
    const dirRadios   = [...document.querySelectorAll('input[name="dir"]')];
    const out         = document.getElementById('out');
    const msg         = document.getElementById('msg');
    const nowBtn      = document.getElementById('nowBtn');
    const autoZoneBtn = document.getElementById('autoZoneBtn');
    const clearBtn    = document.getElementById('clearBtn');

    // ------- Zones (grouped) -------
    const ZONE_GROUPS = [
      { header: "── North America ──", items: [
        ["Central Daylight Time (CDT, UTC−5)","-300|CDT-USA"],
        ["Central Standard Time (CST, UTC−6)","-360|CST-USA"],
        ["Eastern Daylight Time (EDT, UTC−4)","-240|EDT-USA"],
        ["Eastern Standard Time (EST, UTC−5)","-300|EST-USA"],
        ["Mountain Daylight Time (MDT, UTC−6)","-360|MDT-USA"],
        ["Mountain Standard Time (MST, UTC−7)","-420|MST-USA"],
        ["Pacific Daylight Time (PDT, UTC−7)","-420|PDT-USA"],
        ["Pacific Standard Time (PST, UTC−8)","-480|PST-USA"],
        ["Atlantic Standard Time (AST, UTC−4)","-240|AST-CA"],
        ["Atlantic Daylight Time (ADT, UTC−3)","-180|ADT-CA"],
        ["Newfoundland Standard Time (NST, UTC−3:30)","-210|NST-CA"],
        ["Newfoundland Daylight Time (NDT, UTC−2:30)","-150|NDT-CA"],
        ["Alaska Standard Time (AKST, UTC−9)","-540|AKST-USA"],
        ["Alaska Daylight Time (AKDT, UTC−8)","-480|AKDT-USA"],
        ["Hawaii Standard Time (HST, UTC−10)","-600|HST-USA"],
      ]},
      { header: "── Central & South America ──", items: [
        ["Peru Time (PET, UTC−5)","-300|PET"],
        ["Colombia Time (COT, UTC−5)","-300|COT"],
        ["Bolivia Time (BOT, UTC−4)","-240|BOT"],
        ["Chile Standard Time (CLT, UTC−4)","-240|CLT"],
        ["Chile Summer Time (CLST, UTC−3)","-180|CLST"],
        ["Argentina Time (ART, UTC−3)","-180|ART"],
        ["Uruguay Time (UYT, UTC−3)","-180|UYT"],
        ["Brasília Time (BRT, UTC−3)","-180|BRT"],
        ["Fernando de Noronha Time (FNT, UTC−2)","-120|FNT"],
        ["French Guiana Time (GFT, UTC−3)","-180|GFT"],
        ["Venezuela Time (VET, UTC−4)","-240|VET"],
        ["Galápagos Time (GALT, UTC−6)","-360|GALT"],
      ]},
      { header: "── Europe ──", items: [
        ["Greenwich Mean Time (GMT, UTC±0)","0|GMT"],
        ["Western European Time (WET, UTC±0)","0|WET"],
        ["Western European Summer Time (WEST, UTC+1)","60|WEST"],
        ["British Summer Time (BST, UTC+1)","60|BST-UK"],
        ["Irish Standard Time (IST, UTC+1)","60|IST-IE"],
        ["Central European Time (CET, UTC+1)","60|CET"],
        ["Central European Summer Time (CEST, UTC+2)","120|CEST"],
        ["Eastern European Time (EET, UTC+2)","120|EET"],
        ["Eastern European Summer Time (EEST, UTC+3)","180|EEST"],
        ["Moscow Time (MSK, UTC+3)","180|MSK"],
        ["Turkey Time (TRT, UTC+3)","180|TRT"],
      ]},
      { header: "── Africa ──", items: [
        ["West Africa Time (WAT, UTC+1)","60|WAT"],
        ["Central Africa Time (CAT, UTC+2)","120|CAT"],
        ["South Africa Standard Time (SAST, UTC+2)","120|SAST"],
        ["East Africa Time (EAT, UTC+3)","180|EAT"],
        ["Réunion Time (RET, UTC+4)","240|RET"],
        ["Mauritius Time (MUT, UTC+4)","240|MUT"],
        ["Seychelles Time (SCT, UTC+4)","240|SCT"],
        ["Cape Verde Time (CVT, UTC−1)","-60|CVT"],
      ]},
      { header: "── Middle East / Central Asia ──", items: [
        ["Iran Standard Time (IRST, UTC+3:30)","210|IRST"],
        ["Iran Daylight Time (IRDT, UTC+4:30)","270|IRDT"],
        ["Gulf Standard Time (GST, UTC+4)","240|GST"],
        ["Azerbaijan Time (AZT, UTC+4)","240|AZT"],
        ["Armenia Time (AMT, UTC+4)","240|AMT-AM"],
        ["Georgia Time (GET, UTC+4)","240|GET"],
        ["Afghanistan Time (AFT, UTC+4:30)","270|AFT"],
        ["Pakistan Standard Time (PKT, UTC+5)","300|PKT"],
        ["Uzbekistan Time (UZT, UTC+5)","300|UZT"],
        ["Tajikistan Time (TJT, UTC+5)","300|TJT"],
        ["Turkmenistan Time (TMT, UTC+5)","300|TMT"],
        ["Yekaterinburg Time (YEKT, UTC+5)","300|YEKT"],
        ["India Standard Time (IST, UTC+5:30)","330|IST-IN"],
        ["Sri Lanka Standard Time (SLST, UTC+5:30)","330|SLST"],
        ["Nepal Time (NPT, UTC+5:45)","345|NPT"],
        ["Bangladesh Standard Time (BST, UTC+6)","360|BST-BD"],
        ["Kyrgyzstan Time (KGT, UTC+6)","360|KGT"],
        ["Almaty Time (ALMT, UTC+6)","360|ALMT"],
        ["Myanmar Time (MMT, UTC+6:30)","390|MMT"],
      ]},
      { header: "── Southeast & East Asia ──", items: [
        ["Indochina Time (ICT, UTC+7)","420|ICT"],
        ["Western Indonesia Time (WIB, UTC+7)","420|WIB"],
        ["Central Indonesia Time (WITA, UTC+8)","480|WITA"],
        ["Eastern Indonesia Time (WIT, UTC+9)","540|WIT"],
        ["China Standard Time (CST, UTC+8)","480|CST-CHN"],
        ["Hong Kong Time (HKT, UTC+8)","480|HKT"],
        ["Singapore Time (SGT, UTC+8)","480|SGT"],
        ["Philippine Time (PHT, UTC+8)","480|PHT"],
        ["Australian Western Standard Time (AWST, UTC+8)","480|AWST"],
        ["Australian Central Western Standard Time (ACWST, UTC+8:45)","525|ACWST"],
        ["Japan Standard Time (JST, UTC+9)","540|JST"],
        ["Korea Standard Time (KST, UTC+9)","540|KST"],
      ]},
      { header: "── Australia ──", items: [
        ["Australian Central Standard Time (ACST, UTC+9:30)","570|ACST"],
        ["Australian Central Daylight Time (ACDT, UTC+10:30)","630|ACDT"],
        ["Australian Eastern Standard Time (AEST, UTC+10)","600|AEST"],
        ["Australian Eastern Daylight Time (AEDT, UTC+11)","660|AEDT"],
      ]},
      { header: "── Pacific / Oceania ──", items: [
        ["Chamorro Standard Time (CHST, UTC+10)","600|CHST"],
        ["Papua New Guinea Time (PGT, UTC+10)","600|PGT"],
        ["Solomon Islands Time (SBT, UTC+11)","660|SBT"],
        ["Vanuatu Time (VUT, UTC+11)","660|VUT"],
        ["New Zealand Standard Time (NZST, UTC+12)","720|NZST"],
        ["New Zealand Daylight Time (NZDT, UTC+13)","780|NZDT"],
        ["Fiji Standard Time (FJT, UTC+12)","720|FJT"],
        ["Fiji Summer Time (FJST, UTC+13)","780|FJST"],
        ["Chatham Standard Time (CHAST, UTC+12:45)","765|CHAST"],
        ["Chatham Daylight Time (CHADT, UTC+13:45)","825|CHADT"],
        ["Tonga Time (TOT, UTC+13)","780|TOT"],
        ["Tonga Summer Time (TOST, UTC+14)","840|TOST"],
        ["Phoenix Islands Time (PHOT, UTC+13)","780|PHOT"],
        ["Line Islands Time (LINT, UTC+14)","840|LINT"],
      ]},
    ];

    // Flatten for auto-detect
    const FLAT = [];
    ZONE_GROUPS.forEach(g => g.items.forEach(([label,val]) => FLAT.push({label, val, header:g.header})));

    // ------- Combobox wiring -------
    const zoneInput = document.getElementById('zoneInput');
    const zoneMenu  = document.getElementById('zoneMenu');
    const zoneValue = document.getElementById('zoneValue');

    let activeIndex = -1;    // index in rendered menu items
    let visibleItems = [];   // headers + items
    let menuIndexMap = [];   // menu row -> visibleItems index (only clickables)

    function openMenu(){ zoneMenu.classList.add('open'); zoneInput.setAttribute('aria-expanded','true'); }
    function closeMenu(){ zoneMenu.classList.remove('open'); zoneInput.setAttribute('aria-expanded','false'); activeIndex = -1; }
    function setActive(i){
      const items = Array.from(zoneMenu.querySelectorAll('.combo-item'));
      items.forEach(el => el.setAttribute('aria-selected','false'));
      if(i>=0 && i<items.length){ items[i].setAttribute('aria-selected','true'); items[i].scrollIntoView({block:'nearest'}); }
      activeIndex = i;
    }
    function chooseFromVisibleIndex(visIndex){
      const item = visibleItems[visIndex];
      if(!item || item.isHeader) return;
      zoneInput.value = item.label;
      zoneValue.value = item.val; // "minutes|ABBR"
      closeMenu();
    }

    function renderMenu(query=''){
      const q = query.trim().toLowerCase();
      zoneMenu.innerHTML = '';
      visibleItems = [];
      menuIndexMap = [];

      function addHeader(text){
        const h = document.createElement('div');
        h.className = 'combo-header';
        h.textContent = text;
        h.setAttribute('role','presentation');
        zoneMenu.appendChild(h);
        visibleItems.push({isHeader:true, header:text});
      }

      let menuRowCount = 0;

      for (const group of ZONE_GROUPS){
        const groupMatches = group.items
          .map(([label,val]) => ({label,val,header:group.header}))
          .filter(o => !q || o.label.toLowerCase().includes(q));

        if (groupMatches.length){
          addHeader(group.header);
          for (const o of groupMatches){
            if (menuRowCount >= 200) break;

            const visIndex = visibleItems.length;

            const el = document.createElement('div');
            el.className = 'combo-item';
            el.setAttribute('role','option');
            el.textContent = o.label;

            el.addEventListener('mousedown', e => e.preventDefault()); // keep focus
            el.addEventListener('click', () => chooseFromVisibleIndex(visIndex));

            zoneMenu.appendChild(el);
            visibleItems.push(o);

            menuIndexMap.push(visIndex);
            menuRowCount++;
          }
          if (menuRowCount >= 200) break;
        }
      }

      if (menuIndexMap.length){ openMenu(); setActive(0); }
      else { closeMenu(); }
    }

    zoneInput.addEventListener('input', () => {
      if(zoneInput.value.trim() === ''){ zoneValue.value = ''; closeMenu(); return; }
      zoneValue.value = '';
      renderMenu(zoneInput.value);
    });
    zoneInput.addEventListener('focus', () => renderMenu(zoneInput.value));
    zoneInput.addEventListener('blur',  () => setTimeout(closeMenu, 120));
    zoneInput.addEventListener('keydown', (e)=>{
      if(!zoneMenu.classList.contains('open')){
        if(e.key==='ArrowDown'){ renderMenu(zoneInput.value); e.preventDefault(); }
        return;
      }
      const itemCount = zoneMenu.querySelectorAll('.combo-item').length;
      if(e.key==='ArrowDown'){ setActive(Math.min(activeIndex+1, itemCount-1)); e.preventDefault(); }
      else if(e.key==='ArrowUp'){ setActive(Math.max(activeIndex-1, 0)); e.preventDefault(); }
      else if(e.key==='Enter'){
        if (activeIndex >= 0){
          const visIndex = menuIndexMap[activeIndex];
          if (visIndex != null) chooseFromVisibleIndex(visIndex);
          e.preventDefault();
        }
      } else if(e.key==='Escape'){ closeMenu(); }
    });

    // ------- Helpers -------
    function parseHHMM(s){
      if(!s) return null;
      const cleaned = s.replace(/[^0-9]/g, '');
      if(cleaned.length !== 4) return null;
      const hh = Number(cleaned.slice(0,2));
      const mm = Number(cleaned.slice(2));
      if(Number.isNaN(hh) || Number.isNaN(mm)) return null;
      if(hh < 0 || hh > 23 || mm < 0 || mm > 59) return null;
      return hh*60 + mm;
    }
    function pad2(n){ return n.toString().padStart(2,'0'); }
    function fmtMinutes(mins){
      const m = ((mins % 1440) + 1440) % 1440;
      const hh = Math.floor(m/60);
      const mm = m % 60;
      return pad2(hh) + pad2(mm);
    }
    function dayDeltaStr(delta){
      if(delta === 0) return '';
      return delta > 0 ? ` (+${delta} day${delta>1?'s':''})` : ` (${delta} day${delta<-1?'s':''})`;
    }
    // 12-hour formatter (no day deltas here)
    function to12h(hhmm){
      if (!/^\d{4}$/.test(hhmm)) return hhmm;
      let h = parseInt(hhmm.slice(0,2), 10);
      const m = hhmm.slice(2);
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = (h % 12) || 12;
      return `${h}:${m}${ampm}`;
    }

    // ------- Convert -------
    function convert(){
      msg.textContent = '';
      out.style.display = 'none';
      out.textContent = '';
    
      const mins = parseHHMM(timeInput.value);
      if(mins === null){ msg.textContent = 'Enter time as HHMM between 0000 and 2359.'; return; }
    
      const raw = zoneValue.value;
      if(!raw){ msg.textContent = 'Please choose a zone from the list.'; return; }
    
      const [offStr, abbr] = raw.split('|');
      const offsetMin = Number(offStr);
      const dir = dirRadios.find(r=>r.checked)?.value || 'to';
    
      let localMins, zuluMins;
      if (dir === 'to') { localMins = mins; zuluMins = mins - offsetMin; }
      else { zuluMins = mins; localMins = mins + offsetMin; }
    
      const localStr = fmtMinutes(localMins);
      const zuluStr  = fmtMinutes(zuluMins);
    
      const localDayDelta = Math.floor(localMins/1440) - Math.floor(((dir==='to')? mins: zuluMins)/1440);
      const zuluDayDelta  = Math.floor(zuluMins/1440)  - Math.floor(((dir==='to')? localMins: mins)/1440);
    
      const localPart = `${localStr} ${abbr}${dayDeltaStr(localDayDelta)}`;
      const zuluPart  = `${zuluStr} ZULU${dayDeltaStr(zuluDayDelta)}`;
    
      function to12Hour(hhmm){
        let h = parseInt(hhmm.slice(0,2),10);
        const m = hhmm.slice(2);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        return `${h}:${m}${ampm}`;
      }
    
      const local12 = `${to12Hour(localStr)} ${abbr}${dayDeltaStr(localDayDelta)}`;
      const zulu12  = `${to12Hour(zuluStr)} ZULU${dayDeltaStr(zuluDayDelta)}`;
    
      // Wrap each part in spans for alignment
      out.innerHTML = `
        <span class="out-24">${localPart} / ${zuluPart}</span>
        <span class="out-12">${local12} / ${zulu12}</span>
      `;
      out.style.display = 'flex';
      out.style.justifyContent = 'space-between';
    }

    // ------- Buttons -------
    function getCurrentLocalHHMM(){
      const d = new Date();
      return String(d.getHours()).padStart(2,'0') + String(d.getMinutes()).padStart(2,'0');
    }
    function findZoneByOffset(offsetMin){
      return FLAT.find(z => Number(z.val.split('|')[0]) === offsetMin) || null;
    }

    nowBtn.addEventListener('click', () => { timeInput.value = getCurrentLocalHHMM(); });
    autoZoneBtn.addEventListener('click', () => {
      const offsetMin = -new Date().getTimezoneOffset();
      const hit = findZoneByOffset(offsetMin);
      if (hit) { zoneInput.value = hit.label; zoneValue.value = hit.val; msg.textContent = ''; }
      else { zoneInput.value = ''; zoneValue.value = ''; msg.textContent = 'Could not auto-detect a matching zone. Please choose manually.'; out.style.display = 'none'; }
    });

    function resetAll(){
      timeInput.value = '';
      zoneInput.value = '';
      zoneValue.value = '';
      closeMenu();
      document.getElementById('fromz').checked = true;
      msg.textContent = '';
      out.textContent = '';
      out.style.display = 'none';
    }
    clearBtn.addEventListener('click', resetAll);

    zoneInput.addEventListener('search', () => { if(zoneInput.value === ''){ zoneValue.value = ''; closeMenu(); } });

    goBtn.addEventListener('click', convert);
    timeInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') convert(); });
  });
})();