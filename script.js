const timezones = {
    tokyo: 'Asia/Tokyo',
    london: 'Europe/London',
    newyork: 'America/New_York'
};

function updateClocks() {
    const now = new Date();

  for (const [id, zone] of Object.entries(timezones)) {
        const timeEl = document.getElementById(`${id}-time`);
        const dateEl = document.getElementById(`${id}-date`);
        const statusEl = document.getElementById(`${id}-status`);

      if (!timeEl || !dateEl || !statusEl) continue;

      const timeStr = new Intl.DateTimeFormat('ja-JP', {
              timeZone: zone,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
      }).format(now);

      const dateStr = new Intl.DateTimeFormat('ja-JP', {
              timeZone: zone,
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short'
      }).format(now);

      timeEl.textContent = timeStr;
        dateEl.textContent = dateStr;

      const localHour = parseInt(timeStr.split(':')[0]);
        let isOpen = false;

      if (id === 'tokyo' && localHour >= 9 && localHour < 18) isOpen = true;
        if (id === 'london' && localHour >= 8 && localHour < 17) isOpen = true;
        if (id === 'newyork' && localHour >= 8 && localHour < 17) isOpen = true;

      if (isOpen) {
              statusEl.classList.add('open');
      } else {
              statusEl.classList.remove('open');
      }
  }
}

updateClocks();
setInterval(updateClocks, 1000);
