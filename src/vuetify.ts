import 'vuetify/styles';
import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import useSettings from './Client/Settings/Composables/useSettings';
const { settings } = useSettings();

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#2196f3',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#121212',
    surface: '#1d1d1d',
    'on-background': '#dcdcdc',
    'on-surface': '#dcdcdc',
    sidebarPrimary: '#dddddd',
    sidebarBackground: '#181a1b',
    darkBlack: '#131415',
    lightGray: '#1b1818',
  },
};

const light: ThemeDefinition = {
  colors: {
    background: '#FFFFFF',
    primary: '#6200EE',
    secondary: '#03DAC6',
    error: '#B00020',
    surface: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onSecondary: '#000000',
    onError: '#FFFFFF',
    onSurface: '#000000',
    sidebarPrimary: '#3b3b3b',
    sidebarBackground: '#FFFFFF',
  },
};

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: settings.value.theme,
    themes: {
      dark,
      light,
    },
  },
});

export { vuetify };
