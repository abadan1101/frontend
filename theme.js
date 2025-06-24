function setFaviconByTheme() {
  const favicon = document.getElementById('favicon');
  const appleicon = document.getElementById('appleicon');
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const icon = isDark ? '%PUBLIC_URL%/logo5.png' : '%PUBLIC_URL%/logo4.png';
  if (favicon) favicon.href = icon;
  if (appleicon) appleicon.href = icon;
}
function setThemeColorByTheme() {
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (themeMeta) {
    themeMeta.setAttribute('content', isDark ? '#23243a' : '#ffffff');
  }
}
setFaviconByTheme();
setThemeColorByTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  setFaviconByTheme();
  setThemeColorByTheme();
});