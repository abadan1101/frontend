//MÉTODO PARA CONFIGURAR TEMA DA BARRA DE TAREFAS DO NAVEGADOR
function setThemeColorByTheme() {
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (themeMeta) {
    themeMeta.setAttribute('content', isDark ? '#23243a' : '#ffffff');
  }
}
setThemeColorByTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  setThemeColorByTheme();
});