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

// Helper para obter a cor de tema atual com base na preferência do usuário
function getThemeColor() {
  const userColorTheme = localStorage.getItem('colorTheme'); // 'azul', 'verde', 'rosa'
  const validThemes = ['azul', 'verde', 'rosa'];

  if (userColorTheme && validThemes.includes(userColorTheme)) {
    return `ColorTheme-${userColorTheme}`;
  }
  // Retorna undefined se o tema não estiver definido ou for inválido, mantendo o comportamento original.
  return undefined;
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



// Função para aplicar a cor do tema no root css
export function applyColorTheme() {
  const colorTheme = getThemeColor();
  const root = document.documentElement;

  if (!colorTheme) {
    // Se nenhum tema de cor estiver definido, não faz nada, mantendo o que está no CSS.
    return;
  }

  const computedStyle = getComputedStyle(root);

  // Mapeia o tema de cor para um objeto de variáveis a serem definidas.
  // A chave do objeto é a variável de destino (ex: --ligthThemeColor02)
  // O valor é a variável de origem da cor (ex: --ThemeBlue01)
  const colorVarMap = {
    'ColorTheme-azul': {
      '--ligthThemeColor01': '--ThemeBlue01',
      '--ligthThemeColor02': '--ThemeBlue02',
      '--ligthThemeColor03': '--ThemeBlue03',
      '--ligthThemeColor04': '--ThemeBlue04',
      '--ligthThemeColor05': '--ThemeBlue05',
    },
    'ColorTheme-verde': {
      '--ligthThemeColor01': '--ThemeGreen01',
      '--ligthThemeColor02': '--ThemeGreen02',
      '--ligthThemeColor03': '--ThemeGreen03',
      '--ligthThemeColor04': '--ThemeGreen04',
      '--ligthThemeColor05': '--ThemeGreen05',
    },
    'ColorTheme-rosa': {
      '--ligthThemeColor01': '--ThemePink01',
      '--ligthThemeColor02': '--ThemePink02',
      '--ligthThemeColor03': '--ThemePink03',
      '--ligthThemeColor04': '--ThemePink04',
      '--ligthThemeColor05': '--ThemePink05',
    },
  };

  const themeVarsToSet = colorVarMap[colorTheme];

  if (themeVarsToSet) {
    // Itera sobre o objeto de variáveis para o tema selecionado
    for (const [targetVar, sourceVar] of Object.entries(themeVarsToSet)) {
      const colorValue = computedStyle.getPropertyValue(sourceVar).trim();
      if (colorValue) {
        root.style.setProperty(targetVar, colorValue);
      }
    }
  }
}