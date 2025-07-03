// Função para configurar a cor do tema da barra de tarefas do navegador
export function setThemeColorByTheme() {
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const userTheme = localStorage.getItem('theme') || 'sistema';
  let isDark;

  if (userTheme === 'claro') {
    isDark = false;
  } else if (userTheme === 'escuro') {
    isDark = true;
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  if (themeMeta) {
    const root = document.documentElement;
    const darkThemeColor = getComputedStyle(root).getPropertyValue('--darkThemeColor00').trim();
    const lightThemeColor = getComputedStyle(root).getPropertyValue('--ligthThemeColor00').trim();

    themeMeta.setAttribute('content', isDark ? darkThemeColor : lightThemeColor);
  }
}

// Função para aplicar a classe do tema no body
export function applyThemeClass() {
  const userTheme = localStorage.getItem('theme') || 'sistema';
  let themeClass = '';
  if (userTheme === 'claro') themeClass = 'theme-light';
  else if (userTheme === 'escuro') themeClass = 'theme-dark';
  else themeClass = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light';

  // Remove classes antigas e adiciona a nova ao body
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(themeClass);
}