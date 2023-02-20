import 'vuetify/styles';
import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader

const myCustomDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#222426',
    'on-background': '#b9b3aa',
    surface: '#181a1b',
    textColor: '#b9b3aa',
    'on-surface': '#b9b3aa',
    fontWeight: '300',
    primary: '#1a73e8',
    'primary-darken-1': '#e91e39',
    secondary: '#7b809a',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#1a73e8',
    success: '#4caf50',
    warning: '#FB8C00',
    sidebarPrimary: '#dddddd',
    sidebarBackground: '#181a1b',
    darkBlack: '#131415',
    lightGray: '#181a1b',
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
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomDarkTheme,
    },
  },
});

export { vuetify };
