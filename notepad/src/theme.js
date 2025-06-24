// Função para configurar a cor do tema da barra de tarefas do navegador
export function setThemeColorByTheme() {
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (themeMeta) {
    themeMeta.setAttribute('content', isDark ? '#23243a' : '#ffffff');
  }
}