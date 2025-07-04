// IMPORTANTE!!!!!!!!!!!!!!!!
// as rotinas de mudança dos icones pequenos nativos do navegador para claro ou escuro
// estão localizados diteto no index.HTML da pasta public.



// Helper para obter a classe de tema atual com base na preferência do usuário ou do sistema
function getThemeClass() {
  const userTheme = localStorage.getItem('theme') || 'sistema';

  if (userTheme === 'claro') {
    return 'theme-light';
  }
  if (userTheme === 'escuro') {
    return 'theme-dark';
  }
  // para o caso 'sistema'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light';
}



// função para alterar o logo principal (barra superior de pesquisa)
export function changeLogo() {
  const lightLogo = require('../src/img/logo13.png');
  const darkLogo = require('../src/img/logo18.png');

  const logo = document.getElementById('logo');
  if (logo) {
    const themeClass = getThemeClass();
    if (themeClass === 'theme-dark') {
      return lightLogo;
    } else {
      return darkLogo;
    }
  }
}



// Função para configurar a cor do tema da barra de tarefas do navegador
export function setThemeColorByTheme() {
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (!themeMeta) return;

  const isDark = getThemeClass() === 'theme-dark';

  const root = document.documentElement;
  const darkThemeColor = getComputedStyle(root).getPropertyValue('--darkThemeColor00').trim();
  const lightThemeColor = getComputedStyle(root).getPropertyValue('--ligthThemeColor00').trim();

  themeMeta.setAttribute('content', isDark ? darkThemeColor : lightThemeColor);
}



// Função para aplicar a classe do tema no body e diversos
export function applyThemeClass() {
  const themeClass = getThemeClass();

  // Remove classes antigas e adiciona a nova ao body
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(themeClass);
}